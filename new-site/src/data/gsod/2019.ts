export interface GsodMentor {
  name: string;
  email: string;
}

export interface GsodProject {
  id: string;
  title: string;
  description: string[];
  expectedResults: string;
  mentors: GsodMentor[];
}

export interface GsodYear {
  year: number;
  status: 'completed';
  projects: GsodProject[];
}

export const gsod2019: GsodYear = {
  year: 2019,
  status: 'completed',
  projects: [
    {
      id: 'vector',
      title: 'Netflix Vector Documentation',
      description: [
        'Vector is an open source host-level performance monitoring framework which exposes hand-picked, high-resolution system and application metrics to every engineer\'s browser. It focuses on realtime extraction and visualization of performance data primarily using Performance Co-Pilot (PCP) Representational State Transfer (REST) Application Programming Interfaces (APIs).',
        'The goal of this project is to work with mentors and developers in the Vector and PCP communities to extend the existing documentation to include many of the Vector features that are not yet documented. This includes flamegraph, heatmap and table visuals, extended Berkly Packet Format (eBPF) and Linux container instrumentation support, and a number of other areas.',
      ],
      expectedResults: 'This new documentation will take the form of updates to the Vector website, new tutorials (ideally supplemented with short explanatory video content), and inclusion of Vector content in readthedocs.io and RST format to ease the task of community contributors editing and providing new content.',
      mentors: [
        { name: 'Martin Spier', email: 'mspier@netflix.com' },
        { name: 'Andreas Gerstmayr', email: 'andreas@gerstmayr.me' },
      ],
    },
    {
      id: 'grafana',
      title: 'PCP Grafana datasource documentation',
      description: [
        'The Performance Co-Pilot approach to scalable, multi-host performance analysis builds on the Redis distributed data store and its native time series support. The pmseries utility and pmproxy daemon provide the tooling and APIs to support this.',
        'The Grafana PCP data source accesses all PCP metric data via pmproxy REST APIs, which are used to access the scalable Redis backend cache. Resulting Grafana charts and panels can be exported in JSON format with template variables and included as part of Grafana itself, or shipped separately as part of PCP and installed/imported using the Grafana provisioning mechanisms.',
      ],
      expectedResults: 'This is a significant opportunity for a technical writer to work with PCP developers to document new REST APIs, command line utilities, new language specification, and the administrative procedures required to setup a cloud based time series analysis system at scale, as these features are being put into production environments for the first time. The new content will need to link into existing PCP and Grafana docs.',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Mark Goodwin', email: 'mgoodwin@redhat.com' },
      ],
    },
    {
      id: 'howtos',
      title: 'Provide How-To style launching points',
      description: [
        'One area of need in the PCP documentation identified at this years conference was for us to provide short, hands-on introductory texts and videos that guide people toward the in-depth documentation they need. The deep documentation exists and is needed, but its buried in alot of the detail-oriented, jargon-heavy books.',
      ],
      expectedResults: 'A series of short, introductory pieces will be created that provide simple introductions to complex topics. These topics include writing new instrumentation agents, application instrumentation in Java, Go, Rust, python and C languages, writing analysis tools, and some PCP administration tasks. These will each link to the detailed documentation elsewhere - such as in the \'Users and Administors Guide\', or the \'Programmers Guide\'.',
      mentors: [
        { name: 'Ken McDonell', email: 'kenj@kenj.id.au' },
        { name: 'Christian Horn', email: 'chorn@redhat.com' },
        { name: 'Lukas Berk', email: 'lberk@redhat.com' },
      ],
    },
    {
      id: 'readthedocs',
      title: 'Convert docbook content to readthedocs and reStructuredText format',
      description: [
        'The Performance Co-Pilot documentation currently exists in several forms. These are the primary PCP website and the two PCP books (docbook format). This project will focus on transfering and updating this docbook content to RST such that it can be hosted on the modern, community readthedocs.io site. This will allow community contributors to more easily change and extend this content.',
      ],
      expectedResults: 'You will work with the mentors to setup the Performance Co-Pilot readthedocs.io hosting, and by the end of the project we will be able to edit and contribute to the books directly through github.',
      mentors: [
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
        { name: 'Ken McDonell', email: 'kenj@kenj.id.au' },
      ],
    },
  ],
};
