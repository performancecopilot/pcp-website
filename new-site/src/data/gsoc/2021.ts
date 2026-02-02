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

export const gsoc2021: GSoCYear = {
  year: 2021,
  status: 'completed',
  projects: [
    {
      id: 'htop',
      title: 'Extended htop functionality',
      description: [
        'This project involves advancing the performance analysis capabilities provided by the PCP version of the <a href="https://htop.dev/">htop</a> utility, pcp-htop.',
      ],
      tasks: [
        'implementing archive support for historical analysis',
        'implementing support for generalized Meters, allowing any metric to be displayed using htop rather than only the hard-coded set.',
        'implement new PCP metrics for some htop functionality not yet enabled in pcp-htop, such as systemd, battery utilization and netlink.',
      ],
      expectedResults:
        'New code (C language) will be implemented and submitted to be included in htop that allows the backend platform for PCP to take advantage of <a href="https://man7.org/linux/man-pages/man3/PMAPI.3.html">PMAPI</a> features not yet utilized in the current pcp-htop code.',
      prerequisites: 'C programming, ncurses library knowledge a plus.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ashwin Nayaj', email: 'ashwinnayak111@gmail.com' },
        { name: 'Ryan Doyle', email: 'ryan@doylenet.net' },
      ],
    },
    {
      id: 'vmware',
      title: 'Create a VMware PMDA',
      description: [
        'The goal of this project is to create a new VMware PMDA, which exports metris of the VMware hypervisor to PCP. The following library will be used to gather metrics from the hypervisor: <a href="https://code.vmware.com/sdk/vsphere-guest">vSphere Guest SDK</a>',
      ],
      tasks: [
        'creating a new Performance Metrics Domain Agent written in Python',
        'integrating a C API in Python (based on the <a href="https://github.com/dagwieers/vmguestlib">vmguestlib</a> wrapper)',
      ],
      expectedResults:
        'A new VMware PMDA will be implemented and submitted, including unit tests and documentation.',
      prerequisites:
        'Python programming, operating systems, basic knowledge of virtual machines.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Andreas Gerstmayr', email: 'agerstmayr@redhat.com' },
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
      ],
    },
    {
      id: 'series',
      title: 'Query language extension and new functions',
      description: [
        'Performance Co-Pilot timeseries are series of time-stamped values gathered centrally from hosts making performance data available. This data could be gathered for many metrics, at high frequency, and from many hosts. It is potentially high volume data, and searching it efficiently (querying) at speed is a non-trivial problem.',
        'The Performance Co-Pilot timeseries query language is designed to allow fast querying based on metric names and labels. A command line utility and a REST API are available from <a href="https://man7.org/linux/man-pages/man1/pmseries.1.html">pmseries</a> and the <a href="https://man7.org/linux/man-pages/man1/pmproxy.1.html">pmproxy</a> daemon. The existing query language implementation is now maturing, however there are some important new functions needed along with related grammar extensions.',
      ],
      tasks: [
        'grammar extensions supporting scalar operands in expressions, either as literal constants or from functions returning a scalar result.',
        'additional functions complementing existing functions to operate across both the time domain (with one scalar result per metric instance) and across instance domains (with a single vector result).',
        'new statistical functions such as top_k(expr) and nth_percentile(expr, n) and rolling_avg(expr, n).',
        'new functions for subsampling and interpolation of vector operands to match time series samples with other vector operands in an expression.',
      ],
      expectedResults:
        'The student will extend their C language programming skills, learn about the <a href="https://en.wikipedia.org/wiki/Yacc">yacc</a> language parsing tool, performance analysis with PCP and the <a href="https://redis.io/">Redis</a> distributed data store. The student will also collaborate and participate in a vibrant open-source environment with very experienced software engineers and performance analysts.',
      prerequisites: 'C programming.',
      skillLevel: 'advanced',
      mentors: [
        { name: 'Mark Goodwin', email: 'goodwinos@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'pmjson',
      title: 'Extended JSON functionality',
      description: [
        'PCP provides a <a href="https://man7.org/linux/man-pages/man1/pmjson.1.html">pmjson</a> utility for formatting and verifying JSON output from performance analysis tools and the PCP <a href="https://man7.org/linux/man-pages/man3/pmwebapi.3.html">REST</a> API. This project involves extending the functionality provided by the tool so that it is more generally useful.',
      ],
      tasks: [
        'Adding support for the <a href="https://tools.ietf.org/html/draft-pbryan-zyp-json-pointer-02">JSON Pointer</a> syntax, allowing subsets of larger JSON documents to be reported on. This is particularly useful for our regression testing.',
        'Adding support for sorting elements of JSON documents such that the output is presented in a deterministic manner; again, very useful for regression testing.',
        'Adding support for colored console output. This will be useful to enhance the documentation for the PCP REST API, and making the tool output more user friendly in general.',
      ],
      expectedResults:
        'New code (C language) will be implemented and submitted to be included in pmjson providing the described functionality using the <a href="https://github.com/mnunberg/jsonsl">JSONSL</a> library.',
      prerequisites: 'C programming.',
      skillLevel: 'intermediate',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ashwin Nayaj', email: 'ashwinnayak111@gmail.com' },
      ],
    },
  ],
};
