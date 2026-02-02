export interface Mentor {
  name: string;
  email: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string[];
  tasks?: string[];
  size?: 'small' | 'medium' | 'large';
  expectedResults?: string;
  prerequisites?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  mentors: Mentor[];
}

export interface GSoCYear {
  year: number;
  status: 'completed' | 'active' | 'upcoming';
  projects: ProjectIdea[];
}

export const gsoc2018: GSoCYear = {
  year: 2018,
  status: 'completed',
  projects: [
    {
      id: 'htop',
      title: 'PCP version of htop',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. <a href="http://hisham.hm/htop/">HTOP</a> is a performance analysis utility reporting per-process metrics with good, customizable visualization of that data.',
        'This project will involve implementing a HTOP "platform" for PCP.',
      ],
      expectedResults:
        'A (C language) implementation of an HTOP backend using the PCP PMAPI, with accompanying tests and documentation. The student will extend their C programming skills, as well as learn about the ncurses library. Students can also expect to gain insight into the meaning of the kernel data reported by these tools, and the sampling techniques used in building the tools.',
      prerequisites: 'C programming, ncurses library knowledge a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'collectl',
      title: 'PCP version of collectl',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. An initial PCP implementation (pcp-collectl) of the <a href="http://collectl.sourceforge.net/">Collectl</a> utility provides some initial support for the same style of reports. This project will extend that initial code to complete the reporting coverage provided by the initial collectl utility. The pcp-collectl utility will be updated to use the more modern <a href="http://man7.org/linux/man-pages/man1/pmrep.1.html">pmrep</a> utility under the covers. Additionally, the test coverage and documentation will be improved.',
      ],
      expectedResults:
        'The student will extend their Python programming skills, and can also expect to gain insight into the meaning of the kernel data reported by this tool, and the sampling techniques it uses.',
      prerequisites: 'Python programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Marko Myllynen', email: 'myllynen@redhat.com' },
      ],
    },
    {
      id: 'datavis',
      title: 'Visualization and analysis of PCP datasets',
      description: [
        'The PCP <a href="http://man7.org/linux/man-pages/man1/pmlogger.1.html">pmlogger</a> records performance statistics from a running machine, which can be efficiently queried and extracted as time series data using PCP tools like <a href="http://man7.org/linux/man-pages/man1/pmrep.1.html">pmrep</a>',
        'This project will develop a Python application to query, extract, reformat and visualize PCP time series data using Python\'s extensive data-science class libraries (e.g. <a href="http://www.numpy.org/">NumPy</a>, <a href="http://pandas.pydata.org/">Pandas</a>, <a href="https://matplotlib.org/">MatPlotLib</a>, <a href="https://www.scipy.org/">SciPy</a> and others).',
      ],
      expectedResults:
        'Construction of an application (and class libraries) to query PCP time-series data using various client tools and import this into existing scientific data-science libraries for visualization and analysis. Demonstration of meaningful statistical insights from real-world PCP data archives.',
      prerequisites:
        'Strong Python programming, knowledge of statistical analysis, some experience with one or more python data-science libraries.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Marko Myllynen', email: 'myllynen@redhat.com' },
      ],
    },
    {
      id: 'vectorbcc',
      title: 'Vector BCC Tools',
      description: [
        'This project will implement a series of new <a href="https://github.com/Netflix/vector/wiki/Getting-Started">Vector</a> widgets that expose <a href="https://github.com/iovisor/bcc">BCC tools</a> to users via a web interface.',
        'The list of BCC tool widgets to be implemented is open for discussion, but this is the current wishlist:',
        'Already exist in pcp/src/pmdas/bcc/modules, but there might be more work to ensure they work well: biolatency - as input for a latency heat map; biotop - as input for a live table or line chart of per-process I/O time; tcplife - as input for a table of sessions details',
        '6 new metrics: ext4dist/xfsdist/zfsdist - as input for a latency heat map; biosnoop - as input (end time, latency, type: R or W) for a scatter plot: completion time vs latency, and coloring reads red and writes blue; biosnoop - as input (end time, device, offset) for an offset heat map: showing per-device access patterns; execsnoop - as input for a table of process details; tcpretrans - as input for a table of retransmit details; tcptop - as input for a live table or line chart of per-process TCP throughput; runqlat - as input for a latency heat map',
        'Stretch goals: profile - as stack trace input for live CPU flame graphs; cachestat - as input for a line graph showing each statistic',
      ],
      expectedResults: 'Minimum of 6 new widgets added to Vector.',
      prerequisites:
        'JavaScript and AngularJS. Previous experience in performance analysis is a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'bccpmda',
      title: 'BCC PCP Agent (PMDA) Tool Extension',
      description: [
        'This project will extend the capabilities of the current <a href="https://github.com/myllynen/pcp-bcc-pmda">BCC PCP Agent (PMDA)</a>, by adding new <a href="https://github.com/iovisor/bcc">BCC tools</a> to it.',
        'These new tools will be used by <a href="https://github.com/Netflix/vector">Vector</a> in a set of new widgets that will expose these tools via a web interface.',
        'The list of BCC tool widgets to be implemented is open for discussion, but below is the current wishlist.',
        'Some already exist in pcp/src/pmdas/bcc/modules, but there might be more work to ensure they work well: biolatency - as input for a latency heat map; biotop - as input for a live table or line chart of per-process I/O time; tcplife - as input for a table of sessions details',
        '6 new metrics: ext4dist/xfsdist/zfsdist - as input for a latency heat map; biosnoop - as input (end time, latency, type: R or W) for a scatter plot: completion time vs latency, and coloring reads red and writes blue; biosnoop - as input (end time, device, offset) for an offset heat map: showing per-device access patterns; execsnoop - as input for a table of process details; tcpretrans - as input for a table of retransmit details; tcptop - as input for a live table or line chart of per-process TCP throughput; runqlat - as input for a latency heat map',
        'Stretch goals: profile - as stack trace input for live CPU flame graphs; cachestat - as input for a line graph showing each statistic',
      ],
      expectedResults: 'Minimum of 6 new BCC tools added to the BCC PCP Agent (PMDA).',
      prerequisites:
        'C programming and Linux kernel knowledge. Previous experience with BCC/BFP and performance analysis is a plus.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Marko Myllynen', email: 'myllynen@redhat.com' },
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
      ],
    },
    {
      id: 'metadata',
      title: 'Metadata Label Support for Instrumented Applications',
      description: [
        'PCP provides an extremely lightweight mechanism for instrumenting applications using shared memory backed by memory mapped files - the <a href="http://man7.org/linux/man-pages/man5/mmv.5.html">MMV</a> (memory mapped values) API. Recently PCP has been extended to provide arbitrary metric metadata in the form of key/value pairs - as an extension to the metadata it has always provided, namely units, semantics, type, and so on.',
        'This project will explore extending the memory-map instrumentation model with support for labels. Firstly, an extension to the memory mapped format to support labels will be devised by the student and mentor (MMV version 3), and for reading this format will be added to the PMDA and diagnostic utilities. Secondly, the application instrumentation APIs will be extended to support writing this revised format, with new APIs allowing metadata labels to be set for individual metrics and groups of metrics within an application. There are several language bindings that will need to be updated to support this - the student can tackle some or all of these - in languages as varied as C, Java, Python, Go and Rust.',
      ],
      expectedResults:
        'The student will gain substantive knowledge of instrumenting applications for performance analysis efficiently and comprehensively. The Performance Co-Pilot toolkit will be explored in depth, and significant knowledge about system-level performance analysis in general will be acquired.',
      prerequisites:
        'Strong C language proficiency is required, as well as knowledge of one or more of Python, Java, Go and Rust. Experience in Linux use and programming would be beneficial.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
        { name: 'Suyash', email: 'dextrous93@gmail.com' },
        { name: 'Saurav Sachidanand', email: 'sauravsachidanand@gmail.com' },
      ],
    },
    {
      id: 'RESP',
      title: 'RESP (Redis) support in pmproxy',
      description: [
        '<a href="http://redis.io">Redis</a> is an in-memory NoSQL data cache being used in PCP for search and serving time series performance data. PCP metadata and data keys are distributed across potentially many Redis servers, and access to individual keys is automated by PCP client library code, for PCP client tools like pmseries(1). Direct access is relatively non-intuitive for human operators and developers - something we\'d like to change.',
        'Redis clients communicate with the Redis server using a protocol called RESP <a href="https://redis.io/topics/protocol">(REdis Serialization Protocol)</a>. It is a relatively simple text-based protocol which can co-exist with other protocols supported by the PCP pmproxy(1) daemon - i.e. the native and secure PCP protocols.',
        'This project involves extending pmproxy to support RESP, in a fashion similar to the twemproxy <a href="https://github.com/twitter/twemproxy/">(aka NutCracker)</a> project, such that an arbitrary Redis client (like the redis-cli <a href="https://redis.io/topics/rediscli">command</a>) can access the distributed key store using the direct key-to-server mapping mechanism used by the existing PCP time series code.',
      ],
      expectedResults:
        'The student will gain a deep understanding of Redis, a popular in-memory cache, and Performance Co-Pilot, a toolkit for system-level performance analysis.',
      prerequisites:
        'Strong proficiency in C language programming is required. Experience using and developing software on Linux would be advantageous.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'windowspcp',
      title: 'Windows PCP installer',
      description: [
        'PCP has been ported to many platforms, including Windows. This project involves customizing and extending the popular <a href="https://git-for-windows.github.io">git</a> for Windows installer with PCP packages. This installer is a particularly good match for PCP, as it has many of the same sorts of needs, such as the need to install several POSIX command line utilities as well.',
      ],
      expectedResults:
        'Demonstrated monitoring of Windows servers with latest PCP, after a clean installation experience.',
      prerequisites:
        'Knowledge of Windows and POSIX systems, Win32 API experience a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ken McDonell', email: 'kenj@kenj.id.au' },
      ],
    },
    {
      id: 'macosxpcp',
      title: 'Mac OS X PCP installer',
      description: [
        'PCP has been ported to many platforms, including Mac OS X. This project involves building a new PCP installer for the popular Mac OS X platform, based on technologies available in the latest versions of the operating system, switching from the (now deprecated) technologies previously used.',
        'In addition, the student will transition PCP to using <a href="https://en.wikipedia.org/wiki/Launchd">launchd</a> for daemon process management.',
      ],
      expectedResults:
        'Improved installation and runtime experience for PCP on Mac OS X.',
      prerequisites: 'Knowledge of Mac OS X and POSIX systems',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Paul Smith', email: 'psmith@aconex.com' },
      ],
    },
  ],
};
