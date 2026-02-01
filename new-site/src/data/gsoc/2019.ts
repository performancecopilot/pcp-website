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

export const gsoc2019: GSoCYear = {
  year: 2019,
  status: 'completed',
  projects: [
    {
      id: 'archives',
      title: 'Enhancements for PCP archives',
      description: [
        'One of the key features of PCP is that real-time and historical sources of performance metrics are equivalent from the perspective of a client application consuming and processing performance data. The PCP <a href="https://man7.org/linux/man-pages/man5/LOGARCHIVE.5.html">archive</a> format is the corner-stone of the historical data support. This project aims to improve the usefulness and performance of PCP archives through a number of independent sub-projects.',
      ],
      tasks: [
        'Over time, we would like to reduce the volume of archived data by increasing the effective sampling interval, e.g. going from sub-minute sampling for the most recent archives to hourly sampling for weekly or monthly archives. This process needs to account for counters that might wrap, counters that might be reset at system or service restarts, small amounts of missing data, etc. while maintaining the semantics of the original data. <a href="https://man7.org/linux/man-pages/man1/pmlogreduce.1.html">pmlogreduce</a> already does some of this, but there are a number of issues that can best be addressed by a complete re-implementation.',
        'There is considerable redundancy in the on-disk metadata that could be reduced by a new incremental format for instance domains.',
        'When an archive is opened, not all the metrics are of interest to a particular applications, so run-time efficiency could be enhanced by lazy (just in time) loading of metadata.',
      ],
      expectedResults:
        'The student will extend their C language programming skills with both green fields and maintenance development within a big and mature software project. They can also expect to gain deep insight into the semantics of performance data stored within a PCP archive.',
      prerequisites: 'C programming.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Ken McDonell', email: 'kenj@kenj.id.au' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
      ],
    },
    {
      id: 'collectl',
      title: 'PCP version of collectl',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. An initial PCP implementation (pcp-collectl) of the <a href="http://collectl.sourceforge.net/">Collectl</a> utility provides some initial support for the same style of reports. This project will extend that initial code to complete the reporting coverage provided by the initial collectl utility. The pcp-collectl utility will be updated to use the more modern <a href="http://man7.org/linux/man-pages/man1/pmrep.1.html">pmrep</a> utility modules under the covers. Additionally, the test coverage and documentation will be improved.',
      ],
      expectedResults:
        'The student will extend their Python programming skills, and can also expect to gain insight into the meaning of the kernel data reported by this tool, and the sampling techniques it uses.',
      prerequisites: 'Python programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'nmon',
      title: 'PCP version of nmon',
      description: [
        'The Performance Co-Pilot provides a cross-platform API for accessing live and historical performance data from the local or remote hosts. The <a href="http://nmon.sourceforge.net/pmwiki.php">nmon</a> utility provides a curses-based interface for reporting on a variety of system and per-process metrics to a console, as well as a CSV (Comma Separated Value) output format. This project will implement a version of the nmon utility using the PCP metrics API (PMAPI), based on the current nmon source code. Additionally, regression tests will be implemented and documentation will be improved.',
      ],
      expectedResults:
        'The student will extend their C language programming skills, and can also expect to gain insight into the meaning of the kernel data reported by this tool, and the sampling techniques it uses.',
      prerequisites: 'C programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
      ],
    },
    {
      id: 'statsd',
      title: 'Using metrics from statsd with PCP',
      description: [
        'Performance Co-Pilot is a system performance analysis toolkit which currently does not provide an agent for <a href="https://github.com/etsy/statsd">statsd</a> protocol, a text-based UDP protocol for <a href="https://codeascraft.com/2011/02/15/measure-anything-measure-everything/">performance data</a> aggregation. The goal is to design and write a PCP agent as a multi-threaded C process performing aggregation of statsd packets as pluggable modules with two implementations: exact computation and HDR histogram with parsing code as pluggable modules: custom parser or ragel-based parser. Additionally, regression tests will be implemented and documentation provided.',
      ],
      expectedResults:
        'The student will extend their C language programming skills, and learn about the inner workings of performance analysis tools like PCP and statsd.',
      prerequisites: 'C programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Lukas Zapletal', email: 'lzap@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'bpftrace',
      title: 'Using metrics from bpftrace with PCP and Vector',
      description: [
        '<a href="https://github.com/iovisor/pbftrace">bpftrace</a> is a high-level tracing language for efficient kernel tracing using the Linux kernel eBPF (extended Berkeley Packet Filters) feature. The goal is to design and write a PCP agent which runs arbitrary bpftrace scripts and stores the output as PCP metrics, and a new <a href="http://http://getvector.io/">Vector</a> widget which visualizes these collected metrics in a live heat map or table.',
        'The Vector widget will include a bpftrace query builder for the rapid creation of bpftrace scripts.',
        'Regression tests will be implemented and documentation provided.',
      ],
      expectedResults:
        'The student will extend their C language programming skills, and learn about the inner workings of performance analysis tools like PCP, Vector and eBPF.',
      prerequisites: 'C and Javascript programming.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Martin Spiers', email: 'mspiers@netflix.com' },
        { name: 'Marko Myllynen', email: 'myllynen@redhat.com' },
      ],
    },
    {
      id: 'redis',
      title: 'Scaling timeseries injest and querying',
      description: [
        'The Performance Co-Pilot approach to scalable, multi-host performance analysis builds on the <a href="https://redis.io">Redis</a> distributed data store and its native timeseries support. The <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> utility and <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> daemon provide the tooling and APIs to support this. This project will explore scalability limits of each these programs, with the aim of scaling up PCP timeseries injest and querying to the level of many-thousands-of-nodes.',
      ],
      expectedResults:
        'The student will extend their C language programming skills, learn about the <a href="https://redis.io">Redis</a> distributed data store (and <a href="https://redis.io/topics/cluster-spec">Redis clustering</a> in particular), gain deep familiarity with performance tuning tools such as <a href="https://perf.wiki.kernel.org/index.php/Tutorial">perf</a> as well as learning to apply PCP tools to analyse complex distributed system performance problems.',
      prerequisites: 'C programming.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
      ],
    },
    {
      id: 'grafana',
      title: 'Grafana dashboards for PCP metrics',
      description: [
        'This project will involve developing Grafana <a href="https://grafana.com/dashboards">dashboards</a> and panels for displaying high level performance data across the common system level performance analysis domains - CPU, memory, network, disk, applications (and many more). In Grafana, each high level panel can be linked (via a URL) to more detailed performance data, and thus offer an intuitive drill-down model for rapidly solving common, yet complex, performance issues.',
        'The Grafana PCP data source accesses all PCP metric data via <a href="https://redis.io/">Redis</a> and <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> REST APIs. Resulting Grafana charts and panels can be exported in JSON format with template variables and included as part of Grafana itself, or shipped separately as part of PCP and installed/imported using the Grafana provisioning mechanisms.',
        'Additionally, the Grafana <a href="https://grafana.com/plugins/grafana-worldmap-panel/installation">world map</a> panel displays time series data or geohash data from a metric source overlaid on a world map. The PCP <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> tool and APIs can injest and respond to queries about performance metrics labeled with geographical location information, with the help of the <a href="https://redis.io/commands/geohash">geohash</a> support in the <a href="https://redis.io">Redis</a> distributed data store. This project will implement tooling and APIs to interface Grafana and Redis for PCP metrics.',
      ],
      expectedResults:
        'The student will extend their C and Javascript programming skills, will gain insight into the semantics of various forms of performance data available from systems and applications, and visualization techniques appropriate to their analysis. The student will also learn about the <a href="https://redis.io">Redis</a> distributed data store and geolocation services.',
      prerequisites: 'C, Javascript programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
  ],
};
