/* =====================================================================
   build-ics.js
   Reads events.js and writes gak-classes.ics (the subscribe feed).
   Runs automatically in GitHub Actions on every push, so the feed
   always matches your events. You never run this by hand.
       node build-ics.js
===================================================================== */
var fs = require('fs');
var data = require('./events.js');
var ALL_EVENTS = data.ALL_EVENTS;

var TZID = 'America/Los_Angeles';
var WEEKDAY_ICS = ['SU','MO','TU','WE','TH','FR','SA'];

function pad(n){ return String(n).length < 2 ? '0'+n : ''+n; }
function parseYMD(s){ var p = String(s).split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
function atTime(dateStr, timeStr){ var d = parseYMD(dateStr); if(timeStr){ var t = String(timeStr).split(':'); d.setHours(+t[0], +t[1]||0, 0, 0); } return d; }
function endOf(ev, start){
  var s = ev.schedule, end;
  if(s.endTime){ var t = s.endTime.split(':'); end = new Date(start); end.setHours(+t[0], +t[1]||0, 0, 0); }
  else { end = new Date(start.getTime() + 90*60000); }
  return end;
}
function dtLocal(d){ return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'T'+pad(d.getHours())+pad(d.getMinutes())+'00'; }
function dtDate(d){ return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate()); }
function dtUTC(d){ return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+pad(d.getUTCMinutes())+pad(d.getUTCSeconds())+'Z'; }
function icsEscape(s){ return String(s).replace(/[\\;,]/g, function(c){ return '\\'+c; }).replace(/\n/g, '\\n'); }
function plain(html){ return String(html||'').replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ').trim(); }
function foldLine(line){ if(line.length <= 73) return line; var out='', i=0; while(i<line.length){ out += (i?'\r\n ':'') + line.substr(i,73); i+=73; } return out; }

var VTIMEZONE = [
  'BEGIN:VTIMEZONE','TZID:America/Los_Angeles',
  'BEGIN:DAYLIGHT','TZOFFSETFROM:-0800','TZOFFSETTO:-0700','TZNAME:PDT','DTSTART:19700308T020000','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU','END:DAYLIGHT',
  'BEGIN:STANDARD','TZOFFSETFROM:-0700','TZOFFSETTO:-0800','TZNAME:PST','DTSTART:19701101T020000','RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU','END:STANDARD',
  'END:VTIMEZONE'
].join('\r\n');

function veventsFor(ev){
  var s = ev.schedule || {}, blocks = [];
  var summary = icsEscape(plain(ev.title));
  var desc = icsEscape(plain(ev.description) + (ev.link ? '  Register: ' + ev.link : ''));
  var loc = icsEscape(ev.location || ''), url = ev.link || '';
  function vevent(uid, lines){
    return ['BEGIN:VEVENT','UID:'+uid+'@gabrielsartkids.com','DTSTAMP:'+dtUTC(new Date())]
      .concat(lines)
      .concat(['SUMMARY:'+summary, url?'URL:'+url:'', loc?'LOCATION:'+loc:'', 'DESCRIPTION:'+desc, 'END:VEVENT'])
      .filter(Boolean).map(foldLine).join('\r\n');
  }
  if(s.type === 'once'){
    var st = atTime(s.date, s.startTime);
    blocks.push(vevent(ev.id, ['DTSTART;TZID='+TZID+':'+dtLocal(st), 'DTEND;TZID='+TZID+':'+dtLocal(endOf(ev, st))]));
  } else if(s.type === 'dates'){
    (s.dates||[]).forEach(function(ds, i){ var st2 = atTime(ds, s.startTime); blocks.push(vevent(ev.id+'-'+i, ['DTSTART;TZID='+TZID+':'+dtLocal(st2), 'DTEND;TZID='+TZID+':'+dtLocal(endOf(ev, st2))])); });
  } else if(s.type === 'weekly' || s.type === 'biweekly'){
    var anchor = atTime(s.anchor || s.start, s.startTime);
    var rule = 'RRULE:FREQ=WEEKLY;' + (s.type==='biweekly'?'INTERVAL=2;':'') + 'BYDAY=' + WEEKDAY_ICS[anchor.getDay()];
    if(s.until){ var u = parseYMD(s.until); u.setHours(23,59,0,0); rule += ';UNTIL=' + dtUTC(u); }
    var lines = ['DTSTART;TZID='+TZID+':'+dtLocal(anchor), 'DTEND;TZID='+TZID+':'+dtLocal(endOf(ev, anchor)), rule];
    (s.skip||[]).forEach(function(sk){ lines.push('EXDATE;TZID='+TZID+':'+dtLocal(atTime(sk, s.startTime))); });
    blocks.push(vevent(ev.id, lines));
  } else if(s.type === 'range'){
    var rs = parseYMD(s.start), re = parseYMD(s.end || s.start); re.setDate(re.getDate()+1);
    blocks.push(vevent(ev.id, ['DTSTART;VALUE=DATE:'+dtDate(rs), 'DTEND;VALUE=DATE:'+dtDate(re)]));
  }
  return blocks; // ongoing -> []
}

function build(list){
  var body = [];
  list.forEach(function(ev){ body = body.concat(veventsFor(ev)); });
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Gabriels Art Kids//Events//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Gabriel\'s Art Kids Classes & Events','X-WR-TIMEZONE:'+TZID, VTIMEZONE].concat(body).concat(['END:VCALENDAR']).join('\r\n');
}

/* every dated event (skip the open-ended "ongoing" ones) */
var dated = ALL_EVENTS.filter(function(ev){ return ev.schedule && ev.schedule.type !== 'ongoing'; });
fs.writeFileSync('gak-classes.ics', build(dated) + '\r\n', 'utf8');
console.log('Wrote gak-classes.ics with ' + dated.length + ' dated event(s).');
