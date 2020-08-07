#!/bin/sh
set -e

PCPGIT=$1
# Copy all the manpages that are not in the right section
for i in `find $PCPGIT/src/ -iname '*.1' -exec file "{}" \; |grep troff | cut -f1 -d:`; do
    cp $i man/man1
done
for i in `find $PCPGIT/src/ -iname '*.3' -exec file "{}" \; |grep troff | cut -f1 -d:`; do
    cp $i man/man3
done
for i in `find $PCPGIT/src/ -iname '*.5' -exec file "{}" \; |grep troff | cut -f1 -d:`; do
    cp $i man/man5
done

for i in `find man -type f -iname '*.[0-9]'`; do 
    echo "Building: $i"
    man2html $i |grep -v "^Content-type:" > $i.html
    perl -pi -e 's,<BR>Updated: PCP,,' $i.html
    perl -pi -e 's,<BR>Updated: SGI,,' $i.html
    ./scripts/fix-manpages.py $i.html
done


# Simply copy all the man pages that are aliases
# i.e. pmflush is in the pmprintf manpage
cp man/man3/pmprintf.3.html man/man3/pmflush.3.html
cp man/man3/pmdagetoptions.3.html man/man3/pmdagetopt.3.html
cp man/man1/pmlogger_check.1.html man/man1/pmlogger_daily.1.html
cp man/man3/QMC.3.html man/man3/qmc.3.html
cp man/man3/QmcContext.3.html man/man3/qmccontext.3.html
cp man/man3/QmcDesc.3.html man/man3/qmcdesc.3.html
cp man/man3/QmcGroup.3.html man/man3/qmcgroup.3.html
cp man/man3/QmcIndom.3.html man/man3/qmcindom.3.html
cp man/man3/QmcMetric.3.html man/man3/qmcmetric.3.html
cp man/man3/QmcSource.3.html man/man3/qmcsource.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtracebegin.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtraceend.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtraceabort.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtracepoint.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtraceobs.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtracecounter.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtracestate.3.html
cp man/man3/pmdatrace.3.html man/man3/pmtraceerrstr.3.html
cp man/man1/pmie_check.1.html man/man1/pmie_daily.1.html
cp man/man3/pmtime.3.html man/man3/pmtimeconnect.3.html
cp man/man3/pmtime.3.html man/man3/pmtimedisconnect.3.html
cp man/man3/pmtime.3.html man/man3/pmtimerecv.3.html
cp man/man3/pmtime.3.html man/man3/pmtimesendack.3.html
cp man/man3/pmtime.3.html man/man3/pmtimeshowdialog.3.html
cp man/man3/pmgetoptions.3.html man/man3/pmgetopt_r.3.html
cp man/man3/pmgetoptions.3.html man/man3/pmgetcontextoptions.3.html
cp man/man3/pmgetoptions.3.html man/man3/pmfreeoptions.3.html
cp man/man3/pmgetoptions.3.html man/man3/pmusagemessage.3.html
cp man/man3/pmdafetch.3.html man/man3/pmdasetfetchcallback.3.html
cp man/man3/pmrecord.3.html man/man3/pmrecordsetup.3.html
cp man/man3/pmrecord.3.html man/man3/pmrecordaddhost.3.html
cp man/man3/pmrecord.3.html man/man3/pmrecordcontrol.3.html
cp man/man1/pmquery.1.html man/man1/pmconfirm.1.html
cp man/man1/pmquery.1.html man/man1/pmmessage.1.html
cp man/man3/pmdamain.3.html man/man3/pmdagetcontext.3.html
cp man/man3/pmdamain.3.html man/man3/pmdasetresultcallback.3.html
cp man/man3/pmdamain.3.html man/man3/pmdasetdonecallback.3.html
cp man/man3/pmdamain.3.html man/man3/pmdasetendcontextcallback.3.html
cp man/man3/pmdamain.3.html man/man3/pmdasetcheckcallback.3.html
cp man/man3/pmdaeventclient.3.html man/man3/pmdaeventnewclient.3.html
cp man/man3/pmdaeventclient.3.html man/man3/pmdaeventendclient.3.html
cp man/man3/pmdaeventclient.3.html man/man3/pmdaeventclients.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventnewqueue.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventnewactivequeue.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueuehandle.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueueappend.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueuerecords.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueueclients.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueuecounter.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueuebytes.3.html
cp man/man3/pmdaeventqueue.3.html man/man3/pmdaeventqueuememory.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventnewarray.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventresetarray.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventreleasearray.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventaddrecord.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventaddmissedrecord.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventaddparam.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventgetaddr.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventnewhighresarray.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventreleasehighresarray.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventaddhighresrecord.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventaddhighresmissedrecord.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventhighresaddparam.3.html
cp man/man3/pmdaeventarray.3.html man/man3/pmdaeventhighresgetaddr.3.html



# Remove the non html files:
find man/ -type f -not -iname '*.html' -exec rm "{}" \;
