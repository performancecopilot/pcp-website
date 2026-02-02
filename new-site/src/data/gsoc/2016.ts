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

export const gsoc2016: GSoCYear = {
  year: 2016,
  status: 'completed',
  projects: [
    {
      id: 'gocode',
      title: 'Instrumentation of Go programs',
      description: [
        'PCP supports an efficient memory-mapped instrumentation mechanism for extracting performance instrumentation from running programs. There are currently two implementations of the instrumentation API - one written <a href="https://man7.org/linux/man-pages/man3/mmv_stats_init.3.html">in C</a> and the other <a href="https://github.com/performancecopilot/parfait">in Java</a>. This project aims to allow programs written in the Go language to be instrumented with a native Go API (i.e. not using cgo).',
      ],
      expectedResults:
        'A native Go API, allowing Go programs to be instrumented to generate live performance metrics via the <a href="https://man7.org/linux/man-pages/man5/mmv.5.html">MMV</a> shared memory format, read by the PCP <a href="https://man7.org/linux/man-pages/man1/pmdammv.1.html">pmdammv</a> agent. And a sample application demonstrating use of the API.',
      prerequisites: 'Go programming, C a plus',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
        { name: 'Owen Butler', email: 'obutler@aconex.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'vector',
      title: 'Flame graphs in Vector',
      description: [
        '<a href="http://www.brendangregg.com/flamegraphs.html">Flame graphs</a> are a visualization of profiled software, allowing frequently travelled code paths to be identified quickly and accurately. This project idea explores possible interactions between the <a href="https://github.com/Netflix/vector/wiki/Getting-Started">Vector</a> web application, the Linux kernel eBPF and/or <a href="https://man7.org/linux/man-pages/man1/perf.1.html">perf</a> facilities, and the PCP pipe agent <a href="https://man7.org/linux/man-pages/man1/pmdapipe.1.html">pmdapipe</a>',
      ],
      expectedResults:
        'A capability for rendering flame graphs on-demand over a given time interval is available from the Vector web application.',
      prerequisites: 'Javascript, C programming, Linux kernel',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
        { name: 'Dave Brolley', email: 'brolley@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'golang',
      title: 'Performance metric extraction using Go language agents',
      description: [
        'PCP has an agent-based architecture for extracting performance data. Agents are responsible for making live metric values available to monitoring tools. Today, agents can be implemented in C, C++, Perl and Python - this project will extend that set to include agents written in the Go language.',
      ],
      expectedResults:
        'An API binding allowing Go PCP agents, and at least one sample agent demonstrating that binding.',
      prerequisites: 'C programming, Go a plus',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
        { name: 'Owen Butler', email: 'obutler@aconex.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'jolokia',
      title: 'Instrumenting the JVM with Jolokia and PCP',
      description: [
        '<a href="http://jolokia.org">Jolokia.org</a> "is remote JMX with JSON over HTTP", and can be used to extract live performance data from an unmodified Java application.',
        'PCP is a handy performance data sink and analysis toolkit; the goal here is to build a PCP agent to extracted JVM metrics (accessed over JSON/HTTP) from Jolokia for the PCP analysis tools to consume (i.e. for charting, decision making, reporting and other analysis).',
      ],
      expectedResults:
        'A PCP agent that sources JVM performance data from an unmodified Java/other demo application, using Jolokia.',
      prerequisites: 'Java and either Python or C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Paul Smith', email: 'psmith@aconex.com' },
        { name: 'Roland Huss', email: 'rhuss@redhat.com' },
      ],
    },
    {
      id: 'rubylang',
      title: 'Performance metric extraction using Ruby language agents',
      description: [
        'PCP has an agent-based architecture for extracting performance data. Agents are responsible for making live metric values available to monitoring tools. Today, agents can be implemented in C, C++, Perl and Python - this project will extend that set to include Ruby.',
      ],
      expectedResults:
        'An API binding allowing Ruby PCP agents, and at least one sample agent demonstrating that binding.',
      prerequisites: 'Ruby and C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'pmlogger',
      title: 'Optimized logging of unchanging performance metrics',
      description: [
        'The PCP <a href="http://man7.org/linux/man-pages/man1/pmlogger.1.html">pmlogger</a> records statistics from a running machine. Some of these metrics vary frequently over time, but there is a large subset that vary infrequently.',
        'This project will implement changes to pmlogger to only log these metrics when the metric values or set of instances changes. A secondary phase will involve post-processing existing log files to remove duplicate information.',
      ],
      expectedResults:
        'A new command line option to pmlogger to only log changing metrics, and a utility to prune existing archives.',
      prerequisites: 'C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Martins Innus', email: 'minnus@buffalo.edu' },
        { name: 'Ken McDonell', email: 'kenj@internode.on.net' },
        { name: 'Dave Brolley', email: 'brolley@redhat.com' },
      ],
    },
    {
      id: 'blktrace',
      title: 'Block tracing metrics in PCP',
      description: [
        'The Linux kernel block tracing utility extracts crucially important device transfer information in real time, which is reported by the <a href="http://man7.org/linux/man-pages/man8/blktrace.8.html">blktrace</a> utility.',
        'This project involves building an interface between this facility and the PCP monitoring tools, via a new blktrace agent (live) and/or log data import (historical).',
      ],
      expectedResults:
        'New PCP blktrace data consumers are built such that PCP monitoring tools like <a href="http://man7.org/linux/man-pages/man1/pmevent.1.html">pmevent</a> can consume the metrics made available.',
      prerequisites: 'C programming, Linux kernel',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Ken McDonell', email: 'kenj@internode.on.net' },
      ],
    },
    {
      id: 'monitors',
      title: 'PCP versions of console tools',
      description: [
        'There are many handy text-based system analysis tools available on modern Linux platforms - tools like <a href="http://man7.org/linux/man-pages/man1/htop.1.html">htop</a>, <a href="http://man7.org/linux/man-pages/man1/mpstat.1.html">mpstat</a>, <a href="http://man7.org/linux/man-pages/man1/pidstat.1.html">pidstat</a>, <a href="http://man7.org/linux/man-pages/man8/nfsstat.8.html">nfsstat</a> and so on. These programs are quite simple, but while they allow good live-system analysis, they lack historical reporting (to answer questions like "what was happening on the system at 2am last Tuesday?").',
        'PCP makes it easy to access both historical and live performance data from client programs and (Python) scripts. This project involves extending (and/or re-implementing) performance tools from the above list, using PCP APIs to solve the historical query aspect. Students can expect to gain insight into the meaning of the kernel data reported by these tools, and the sampling techniques used in building the tools.',
      ],
      expectedResults:
        'Build and test versions of a selection of system tools using PCP APIs to provide new functionality.',
      prerequisites: 'Intermediate C, Python programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
      ],
    },
    {
      id: 'windows',
      title: 'Native 64-bit Windows PCP installer',
      description: [
        'PCP has been ported to many platforms, including Linux, Solaris, FreeBSD, Mac OS X and also Windows. The native Windows port was achieved using the MinGW-w64 toolchain and cross-compilation from Fedora. This project involves producing installable MSI packages using the open source msitools or WiX packages.',
      ],
      expectedResults:
        'Demonstrated monitoring of Windows servers with 64-bit PCP code. Installation via MSI package.',
      prerequisites: 'C and C++ programming, XML, Windows APIs',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ken McDonell', email: 'kenj@internode.on.net' },
      ],
    },
  ],
};
