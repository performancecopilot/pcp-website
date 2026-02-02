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

export const gsoc2015: GSoCYear = {
  year: 2015,
  status: 'completed',
  projects: [
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
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'monitors',
      title: 'PCP versions of common monitoring tools',
      description: [
        'There are many handy text-based analysis tools available on modern Linux platforms - tools like <a href="http://man7.org/linux/man-pages/man8/vmstat.8.html">vmstat</a>, <a href="http://man7.org/linux/man-pages/man1/mpstat.1.html">mpstat</a>, <a href="http://man7.org/linux/man-pages/man1/iostat.1.html">iostat</a>, <a href="http://man7.org/linux/man-pages/man1/pidstat.1.html">pidstat</a>, <a href="http://man7.org/linux/man-pages/man8/nfsstat.8.html">nfsstat</a> and so on. These programs are very simple, and while allowing good live-system analysis they lack historical reporting (to answer questions like "what was happening on the system at 2am on Tuesday?").',
        'PCP makes it easy to access both historical and live performance data from Python scripts. This project involves implementing several performance tools from the above list in Python, using the PCP APIs to solve the historical query aspect. Students can expect to gain insight into the meaning of the kernel data reported by these tools, and the sampling techniques used in building the tools.',
      ],
      expectedResults:
        'Build and test versions of a selection of system tools using the PCP python APIs to provide new functionality.',
      prerequisites: 'Python programming',
      skillLevel: 'beginner',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
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
        { name: 'Paul Smith', email: 'psmith@aconex.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
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
        { name: 'Paul Smith', email: 'psmith@aconex.com' },
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
      ],
    },
    {
      id: 'anomaly',
      title: 'Anomaly detection in PCP Archives',
      description: [
        'We collect PCP archives that store the state of a machine while running an application. These archives collect metrics like processor utilization, memory consumption, network utilization, etc. We have a set of algorithms that are useful in determining if an application has run inefficiently.',
        'The student would be expected to code an implementation that would apply these algorithms to existing PCP archives to determine which applications have performed poorly.',
      ],
      expectedResults:
        'Scripts that can analyze application performance based on application specific algorithms.',
      prerequisites: 'Python programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Martins Innus', email: 'minnus@buffalo.edu' },
        { name: 'Joe White', email: 'jwhite@aconex.com' },
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
      ],
    },
    {
      id: 'blktrace',
      title: 'Block tracing metrics in PCP',
      description: [
        'The Linux kernel block tracing utility extracts crucially important device transfer information in real time, which is reported by the <a href="http://man7.org/linux/man-pages/man8/blktrace.8.html">blktrace</a> utility.',
        'This project involves building an interface between this facility and the PCP monitoring tools, via a new blktrace agent.',
      ],
      expectedResults:
        'A new PCP blktrace PMDA is built such that PCP monitoring tools like <a href="http://man7.org/linux/man-pages/man1/pmevent.1.html">pmevent</a> can consume the metrics it makes available.',
      prerequisites: 'C programming',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Paul Evans', email: 'paul@pajp.org.uk' },
      ],
    },
    {
      id: 'windows',
      title: 'Native 64-bit Windows PCP port',
      description: [
        'PCP has been ported to many platforms, including Linux, Solaris, FreeBSD, Mac OS X and also Windows. The native Windows port was achieved using the MinGW Win32 toolchain. This project involves porting the Windows support already in the PCP codebase to using the MinGW64 compiler.',
        'A stretch goal is the subsequent packaging work for a clean installation experience (e.g. MSI packages have been built in the past).',
      ],
      expectedResults:
        'Demonstrated monitoring of Windows servers with 64-bit PCP code. Installation via MSI package.',
      prerequisites: 'C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ken McDonell', email: 'kenj@internode.on.net' },
      ],
    },
  ],
};
