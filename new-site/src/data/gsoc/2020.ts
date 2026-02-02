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

export const gsoc2020: GSoCYear = {
  year: 2020,
  status: 'completed',
  projects: [
    {
      id: 'grafana',
      title: 'Extending the Grafana integration',
      description: [
        'This project involves advancing the performance analysis capabilities provided by the PCP <a href="https://grafana.com/">Grafana</a> integration in <a href="https://grafana-pcp.readthedocs.io/">grafana-pcp</a>.',
      ],
      tasks: [
        'developing a \'reactive\' dashboard with the <a href="https://grafana.com/docs/grafana/latest/reference/scripting/">scripted dashboards</a> feature of Grafana and using PCP metrics',
        'implementing support for PCP \'derived metrics\' in the Vector data source, as described in the PCP <a href="https://man7.org/linux/man-pages/man3/pmwebapi.3.html">REST API</a> documentation',
        'improving the \'metric search\' process by creating a new page for live, full-text search on PCP metric names, labels and descriptions',
      ],
      expectedResults:
        'The student will extend their TypeScript and React programming skills, will gain insight into the semantics of various forms of performance data available from systems and applications, and visualization techniques appropriate to their analysis. They will also learn a great detail about the inner workings of <a href="https://grafana.com/">Grafana</a>, a popular open-source visualization tool.',
      prerequisites: 'TypeScript, JavaScript and React programming, operating systems.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Andreas Gerstmayr', email: 'agerstmayr@redhat.com' },
        { name: 'Jason Koch', email: 'jkoch@netflix.com' },
      ],
    },
    {
      id: 'pbench',
      title: 'Improving the pbench integration',
      description: [
        'This project involves advancing the performance analysis capabilities provided by the PCP integration within the <a href="https://distributed-system-analysis.github.io/pbench/">pbench</a> benchmarking and analysis framework.',
      ],
      tasks: [
        'Modifying pbench to leverage pmlogger\'s remote collection capabilities',
        'Leveraging PCP\'s archive compression feature for efficient storage',
        'Enhancing pbench with the ability to enable live display of collected metrics via <a href="https://grafana.com/">Grafana</a>',
        'Modify PCP to provide new <a href="https://man7.org/linux/man-pages/man1/pmcd.1.html">pmcd</a> agent metrics, <a href="https://man7.org/linux/man-pages/man1/pmlogger.1.html">pmlogger</a> and <a href="https://man7.org/linux/man-pages/man1/pmlogconf.1.html">pmlogconf</a> templates tailored to recommended performance analysis data collection for target workloads (database, web server, computation, low-latency networking, etc.)',
      ],
      expectedResults:
        'The student will extend their Python and Bash programming skills, learn about extensible system benchmarking with <a href="https://distributed-system-analysis.github.io/pbench/">pbench</a>, learn how to export data to <a href="https://redis.io/">Redis</a> for the <a href="https://grafana-pcp.readthedocs.io/">grafana-pcp</a> data source, work with the PCP <a href="https://man7.org/linux/man-pages/man1/pmlogger.1.html">pmlogger</a> tool to efficiently collect data, and discover the kinds of operating system and application metrics PCP is capable of collecting to match various workloads.',
      prerequisites: 'Python and Bash programming, operating systems.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Peter Portant', email: 'pportant@redhat.com' },
        { name: 'Nick Dokos', email: 'ndokos@redhat.com' },
      ],
    },
    {
      id: 'language',
      title: 'Timeseries query language extension',
      description: [
        'Performance Co-Pilot timeseries are series of time-stamped values gathered centrally from hosts making performance data available. This data could be gathered for many metrics, at high frequency, and from many hosts. It is potentially high volume data, and searching it efficiently (querying) at speed is a non-trivial problem.',
        'The Performance Co-Pilot timeseries query language is designed to allow fast querying based on metric names and labels. A command line utility and a REST API are available from <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> and the <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> daemon.',
      ],
      tasks: [
        'statistical functions (sum, mean, average, standard deviation, histogram binning, top-N, N-th percentile)',
        'rate conversion function for counter metrics',
        'scale and unit conversion functions',
        'mathematical functions (abs, floor, log, sqrt, round)',
        'binary operators for numeric metrics (addition, subtraction, division, multiplication, exponentiation)',
      ],
      expectedResults:
        'The student will extend their C language programming skills, learn about the <a href="https://en.wikipedia.org/wiki/Lex_(software)">lex</a> and <a href="https://en.wikipedia.org/wiki/Yacc">yacc</a> language parsing tools, performance analysis with PCP and the <a href="https://redis.io/">Redis</a> distributed data store.',
      prerequisites: 'C programming.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'scalable',
      title: 'Scaling timeseries injest and querying',
      description: [
        'The Performance Co-Pilot approach to scalable, multi-host performance analysis builds on the <a href="https://redis.io/">Redis</a> distributed data store and its native timeseries support. The <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> utility and <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> daemon provide the tooling and APIs to support this. This project will improve scalability in these programs through:',
      ],
      tasks: [
        'extending PCP instrumentation in <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> to expose latency and throughput metrics to analysis tools',
        'adding PCP functionality to make <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> queries use Redis features for parallel query execution, with the aim of scaling up PCP timeseries injest and querying to the level of many-thousands-of-nodes.',
        'implementing compression of responses in <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> and evaluating impact on overall and individual response performance',
        'implementing and evaluating other performance improvement ideas based on profiling and analysis of the server under load',
      ],
      expectedResults:
        'The student will extend their C language programming skills, learn about the <a href="https://redis.io/">Redis</a> distributed data store (and <a href="https://redis.io/topics/cluster-spec">Redis clustering</a> in particular), gain deep familiarity with low-level Linux performance tuning tools such as <a href="https://perf.wiki.kernel.org/index.php/Tutorial">perf</a> and <a href="https://github.com/iovisor/bpftrace/blob/master/README.md">bpftrace</a> as well as learning to apply PCP tools to analyse complex distributed system performance problems.',
      prerequisites: 'C programming, Linux experience.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
      ],
    },
  ],
};
