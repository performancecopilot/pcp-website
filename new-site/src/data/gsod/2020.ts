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

export const gsod2020: GsodYear = {
  year: 2020,
  status: 'completed',
  projects: [
    {
      id: 'grafana-pcp',
      title: 'PCP Grafana documentation',
      description: [
        'grafana-pcp is a plugin for Grafana, which allows the visualization of Performance Co-Pilot metrics in the Grafana metric visualization application. There are three data sources available at the moment:',
        '1. scalable, multi-host performance metrics stored in the Redis distributed data store',
        '2. live, on-host metrics provided by the Vector data source (supercedes the original standalone Vector web application, which is now deprecated)',
        '3. on-demand kernel metrics provided by bpftrace scripts',
        'All three data sources access PCP metric data via pmproxy REST APIs, which in turn requests the metric values from the scalable Redis database, pmapi or the bpftrace PMDA. Grafana dashboards can be exported in JSON format and shipped with grafana-pcp or imported using the Grafana provisioning mechanisms.',
        'This is a significant opportunity for a technical writer to work with PCP developers to document the existing functionality, write guides, document REST APIs and the administrative procedures required to setup local and cloud-based time series analysis at scale.',
      ],
      expectedResults: 'Initial documentation is available at grafana-pcp.readthedocs.io, which will serve as a starting point. This documentation should be extended by describing the functionality of grafana-pcp in much greater detail, adding screenshots, infographics and various guides to setup core functionality. Additionally, the documentation should contain a section about the technical details - specifically the interaction of all involved components (pmcd, pmproxy, pmseries, redis, Grafana) with one or more diagrams.',
      mentors: [
        { name: 'Andreas Gerstmayr', email: 'agerstmayr@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'howtos',
      title: 'Provide How-To style launching points',
      description: [
        'One area of need in the PCP documentation identified at last years conference was for us to provide short, hands-on introductory texts and videos that guide people toward the in-depth documentation they need. The deep documentation exists and is needed, but its buried in alot of the detail-oriented, jargon-heavy books.',
      ],
      expectedResults: 'A series of short, introductory pieces will be created that provide simple introductions to complex topics. These topics include writing new instrumentation agents, application instrumentation in Java, Go, Rust, python and C languages, writing analysis tools, and some PCP administration tasks. These will each link to the detailed documentation elsewhere - such as in the \'Users and Administors Guide\', or the \'Programmers Guide\'.',
      mentors: [
        { name: 'Christian Horn', email: 'chorn@redhat.com' },
        { name: 'Apurva Bhide', email: 'abhide@redhat.com' },
      ],
    },
    {
      id: 'pbench',
      title: 'Benchmarking with PCP and pbench',
      description: [
        'This project involves documenting recent advances in the performance analysis capabilities provided by PCP within the pbench benchmarking and analysis framework. This involves documenting the new pbench direction of using the PCP pmlogger tool\'s remote collection and efficient archive storage capabilities. Users should also be guided through the processes for adding new PCP metrics into the set collected during a pbench benchmarkng run. This could be in the form of tutorials, extensions to the existing online pbench documentation, other novel formats, or all of the above.',
      ],
      expectedResults: 'This project provides a good opportunity to the technical writer to work hand-in-hand with PCP and pbench developers. The new content will need to link in, and form part of the existing pbench documentation, such that it guides the (expert level) users how to use the tools in an intuitive and informative way.',
      mentors: [
        { name: 'Ashwin Nayak', email: 'ashwinnayak111@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'readthedocs-pcp',
      title: 'Convert docbook content to readthedocs and reStructuredText format',
      description: [
        'The Performance Co-Pilot documentation currently exists in several forms. These are the primary PCP website and the PCP books (docbook format). This project will focus on transfering and updating this docbook content to RST such that it can be hosted on the modern, community readthedocs.io site. This will allow community contributors to more easily change and extend this content.',
      ],
      expectedResults: 'You will work with the mentors to setup the Performance Co-Pilot readthedocs.io hosting, and by the end of the project we will be able to edit and contribute to the books directly through github.',
      mentors: [
        { name: 'Apurva Bhide', email: 'abhide@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'readthedocs-restapi',
      title: 'Convert REST API documentation from man page to developer friendly format',
      description: [
        'The Performance Co-Pilot REST API is currently documented in man page format primarily. This is not ideal for web developers, so we\'d like to transition to separate formatted web pages describing individual requests, allowed inputs, sample outputs, etc. Likely, this would also be in RST form such that it can be hosted on the modern, community readthedocs.io site. This will allow community contributors to more easily change and extend this content.',
      ],
      expectedResults: 'You will work with the mentors to create modern REST API documentation for the Performance Co-Pilot, readily consumable by web developers.',
      mentors: [
        { name: 'Andreas Gerstmayr', email: 'agerstmayr@redhat.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
    {
      id: 'readthedocs-pbench',
      title: 'Convert pbench MarkDown content to readthedocs and reStructuredText format',
      description: [
        'The pbench benchmarking suite makes use of Performance Co-Pilot services for recording arbitrary performance metrics during benchmark runs. It is currently documented in a traditional fashion similar to PCP itself, with much content in large individual files and typically in MarkDown format. This project will focus on transfering and updating the pbench guides to RST such that it can be hosted on the modern, community readthedocs.io site. This will allow community contributors to more easily change and extend this content.',
      ],
      expectedResults: 'You will work with the mentors to setup the pbench readthedocs.io hosting, and by the end of the project we will be able to edit and contribute to the content directly through github.',
      mentors: [
        { name: 'Ashwin Nayak', email: 'ashwinnayak111@gmail.com' },
        { name: 'Nathan Scott', email: 'nathans@redhat.com' },
      ],
    },
  ],
};
