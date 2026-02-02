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

export const gsoc2017: GSoCYear = {
  year: 2017,
  status: 'completed',
  projects: [
    {
      id: 'htop',
      title: 'PCP version of htop',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. <a href="http://hisham.hm/htop/">HTOP</a> is a performance analysis utility reporting per-process metrics with good, customizable visualization of that data. This project will involve implementing a HTOP "platform" for PCP.',
      ],
      expectedResults:
        'A (C language) implementation of an HTOP backend using the PCP PMAPI, with accompanying tests and documentation. The student will extend their C programming skills, as well as learn about the ncurses library. Students can also expect to gain insight into the meaning of the kernel data reported by these tools, and the sampling techniques used in building the tools.',
      prerequisites: 'C programming, ncurses library knowledge a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
      ],
    },
    {
      id: 'collectl',
      title: 'PCP version of collectl',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. An initial PCP implementation (pcp-collectl) of the <a href="http://collectl.sourceforge.net/">Collectl</a> utility provides some initial support for the same style of reports. This project will extend that initial code to complete the reporting coverage provided by the initial collectl utility. Additionally, the pcp-collectl utility will be updated to use modern PCP API extensions, improve the test coverage and documentation.',
      ],
      expectedResults:
        'The student will extend their Python programming skills, and can also expect to gain insight into the meaning of the kernel data reported by this tool, and the sampling techniques it uses.',
      prerequisites: 'Python programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
      ],
    },
    {
      id: 'blocked',
      title: 'Blocked process detection and reporting',
      description: [
        'Processes can become blocked from running as they wait for resources. This may be processor time, waiting for I/O, blocked waiting for some other process, etc. Understanding these delays can be critical for a performance analyst optimizing elapsed time in a workflow.',
        'In last years Google Summer of Code, a student created the <a href="http://man7.org/linux/man-pages/man1/pcp-pidstat.1.html">pcp-pidstat</a> utility. This year, that tool will be extended to detect and report on blocked processes - showing when, why and by whom processes become blocked and unblocked.',
      ],
      expectedResults:
        'The student will extend their Python programming skills, and can also expect to gain insight into the meaning of the kernel data reported by this tool, and the sampling techniques it uses.',
      prerequisites: 'Python programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'dmstats',
      title: 'Device Mapper statistics',
      description: [
        'The Linux kernel device mapper statistics framework (dmstats) provides flexible IO statistics for device-mapper block devices, including logical volumes, multipath and RAID devices, as well as thinly-provisioned and cache volumes. A command line tool, <a href="https://www.mankier.com/8/dmstats">dmstats</a>, allows administrators to configure and use the facility directly. This project will use the dmstats API to allow dmstats performance data to be made available to PCP users via a new PCP PMDA. The primary API for dmstats is C but an experimental Python API exists and may be suitable for prototyping. The project will explore not only exporting simple counter and metric values, but will also evaluate the feasibility of including support for advanced features including dmstats latency and IO distribution histograms.',
      ],
      expectedResults:
        'A PCP PMDA for the dmstats subsystem will be designed, implemented, tested and documented. The PMDA need not implement all the available dmstats functionality immediately but it should be designed in such a way as to permit future extension and enhancement.',
      prerequisites:
        'C, Python (optional), some knowledge of logical volume management and software defined storage is a bonus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Bryn M. Reeves', email: 'bmr@redhat.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
      ],
    },
    {
      id: 'ebpf',
      title: 'Instrumentation with eBPF',
      description: [
        'eBPF (extended Berkeley Packet Filtering) is the latest tracing capability added to the Linux kernel, which is an enhancement over <a href="https://en.wikipedia.org/wiki/Berkeley_Packet_Filter">BPF</a>. It is an in-kernel bytecode machine that can be used for tracing, instrumentation and other capabilities. It can be used to create custom metrics by either instrumenting the kernel or a userspace program.',
        'Tools like <a href="https://iovisor.github.io/bcc/">bcc</a> have an elegant API and scripts (in python) to use the eBPF interface to instrument the kernel/processes.',
      ],
      expectedResults:
        'A PCP PMDA (using bcc) for the bpf subsystem will be designed, implemented, tested and documented. The PMDA can implement a few basic metrics and it should be extensible, so that it can be enhanced. The student is expected to gain insights on Linux kernel and user-space instrumentation.',
      prerequisites: 'Python, C, Linux kernel.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Hemant Kumar', email: 'hemant@linux.vnet.ibm.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'logsummary',
      title: 'Graphical Log Summaries',
      description: [
        'The PCP <a href="http://man7.org/linux/man-pages/man1/pmlogger.1.html">pmlogger</a> records statistics from a running machine. This project will develop a Python class library to read in PCP archives with multidimensional indexing for data-science style analysis and performance data mining. It will also feed <a href="http://man7.org/linux/man-pages/man1/pmlogsummary.1.html">pmlogsummary</a> statistical data into Python\'s extensive data-science class librariess (e.g. <a href="http://www.numpy.org/">numpy</a>) for analysis and graphical visualization.',
      ],
      expectedResults:
        'Construction of a class library to assist with exporting PCP data to scientific libraries, as well as tools to visualize that data.',
      prerequisites:
        'Python programming, <a href="https://wiki.python.org/moin/PyQt">PyQt</a> knowledge a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'vectorflames',
      title: 'Flame Graphs in Vector',
      description: [
        '<a href="http://www.brendangregg.com/flamegraphs.html">Flame Graphs</a> are a visualization of profiled software, allowing frequently travelled code paths to be identified quickly and accurately. This project will implement an efficient interface between the <a href="https://github.com/Netflix/vector/wiki/Getting-Started">Vector</a> web application, the Linux kernel eBPF and/or <a href="https://man7.org/linux/man-pages/man1/perf.1.html">perf</a> facilities, and a PCP agent (PMDA) like <a href="https://man7.org/linux/man-pages/man1/pmdapipe.1.html">pmdapipe</a> to trigger and relay the output to Vector',
      ],
      expectedResults:
        'A capability for rendering Flame Graphs on-demand over a given time interval is available from the Vector web application.',
      prerequisites:
        'C programming and Linux kernel knowledge, JavaScript, Angular is a plus.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'vectorcustom',
      title: 'Custom Graphs in Vector',
      description: [
        'The <a href="https://github.com/Netflix/vector/wiki/Getting-Started">Vector</a> web application produces graphs and performance dashboards for live analysis. The student will design and build a new Vector widget for creating ad-hoc graphs, for arbitrary PCP metrics.',
      ],
      expectedResults:
        'The <a href="http://getvector.io/docs/creating-widgets.html">simple example</a> shows creation of a custom Vector widget by-hand, it gives an idea of the sorts of configurable widget that we aim to generate.',
      prerequisites: 'JavaScript, Angular is a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Henry Chang', email: 'hc3249@gmail.com' },
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
        { name: 'Ken McDonell', email: 'kenj@internode.on.net' },
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
    {
      id: 'rubylang',
      title: 'Instrumentation of Ruby applications',
      description: [
        'PCP supports a mechanism for developers to expose metrics inside their own applications. There are three existing implementations - one for each of C, Java and Go. This project expands that to include Ruby.',
      ],
      expectedResults:
        'The project will be implemented in three stages: Create a library to write out the MMVv1/2 format. Create a higher-level API for developers to use to add metrics to their applications. Integrate with Rails and Sinatra web frameworks to automatically expose common metrics',
      prerequisites: 'Ruby and C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'rustlang',
      title: 'Instrumentation of Rust applications',
      description: [
        'PCP supports a mechanism for developers to expose metrics inside their own applications. There are three existing implementations - one for each of C, Java and Go. This project expands that to include Rust.',
      ],
      expectedResults:
        'The project will be implemented in three stages: Create a library to write out the MMVv1/2 format. Create a higher-level API for developers to use to add metrics to their applications. Minimal, and if time permits larger and more comprehensive examples on real-world usage of the library. Perhaps integrating with existing libraries/frameworks in rust, like the go-kit integration for speed.',
      prerequisites: 'Rust and C programming',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Suyash', email: 'dextrous93@gmail.com' },
      ],
    },
    {
      id: 'parfait',
      title: 'Java Metric Coverage',
      description: [
        'The <a href="https://github.com/performancecopilot/parfait">Parfait</a> project provides a java-agent for JVM applications exporting metrics into PCP. Typically these metrics are accessed via JMX initially.',
        'The issue we face is the lack of metadata associated with JMX beans - PCP needs to export the units, semantics and other metadata for these metrics. Currently we encode this information via Spring XML configuration in the parfait-agent directly. This project will implement a tool to aid automation of the process of tracking JMX metrics and categorising their metadata, building on the existing Spring-based Parfait agent code and support the addition of new metrics more easily.',
      ],
      expectedResults:
        'A Java utility will be designed, implemented, tested and documented that reports on the available JMX metrics from a running application, and the performance metric metadata associated with each. When new JMX beans are found, the utility will drive the process of applying performance-related metadata (such as units) before exporting values to PCP for recording, reporting, visualizing, inference and so on.',
      prerequisites: 'Java',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Jie Kang', email: 'jkang@redhat.com' },
        { name: 'Werner Keil', email: 'werner.keil@gmail.com' },
        { name: 'Paul Smith', email: 'psmith@aconex.com' },
      ],
    },
    {
      id: 'hawkular',
      title: 'Hawkular Metric Exporter',
      description: [
        'The <a href="http://www.hawkular.org">Hawkular</a> open source monitoring solution provides a performance metric store for metrics from arbitrary sources. This project will use the PCP API to implement a bridge between the low-level platform metrics (kernel, hardware, databases, and so on) available from PCP and a Hawkular instance. The project will explore not only exporting metric values, but also other metric metadata available from PCP (such as units, value type, semantics and labels) into Hawkular for a rich integration.',
      ],
      expectedResults:
        'A Python utility will be designed, implemented, tested and documented that uses the PCP APIs to export performance metrics to Hawkular, via the Hawkular metrics REST interface.',
      prerequisites: 'Python, Java knowledge a plus',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
        { name: 'Matthew Wringe', email: 'mwringe@redhat.com' },
      ],
    },
    {
      id: 'prometheus',
      title: 'Prometheus Metric Exporter',
      description: [
        'The <a href="http://prometheus.io">Prometheus</a> open source monitoring solution provides a performance metric store for metrics from arbitrary sources. This project will use the PCP API to implement a bridge between the low-level platform metrics (kernel, hardware, databases, and so on) available from PCP and a Prometheus instance. The project will explore not only exporting metric values, but also other metric metadata available from PCP (such as units, value type, semantics and labels) into Prometheus for a rich integration.',
      ],
      expectedResults:
        'A Python utility will be designed, implemented, tested and documented that uses the PCP APIs to export performance metrics to Prometheus, via the Prometheus exporter Python API.',
      prerequisites: 'Python, Golang knowledge a plus',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
  ],
};
