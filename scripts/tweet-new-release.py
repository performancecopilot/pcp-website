#!/usr/bin/python

# In order to get the API tokens for this script to work do the
# following:
# Go to http://apps.twitter.com and login with user "performancepcp"
# and password
# Click on "Create New App", fill in the fields and create the app
# You should then be able to obtain four values (keys+secrets). Just
# put them in a ~/.pcptwitter.conf file like the following:
# $ more ~/.pcptwitter.conf 
# [twitter]
# consumer_key = ....
# consumer_secret = ....
# access_token_key = ....
# access_token_secret = .... 

from __future__ import print_function
import ConfigParser
import os
import sys

USER="performancepcp"

try:
    import twitter
except ImportError:
    sys.stderr.write('Need to install the python-twitter package\n')
    sys.exit(1)

def check_conffile(config):
    section = 'twitter'
    keys = ['consumer_key', 'consumer_secret', 'access_token_key', 'access_token_secret']
    d = {}
    if config.has_section(section):
        for i in keys:
            if not config.has_option(section, i):
                return False
            d[i] = config.get(section, i)
    else:
        return False
    return d

def main():
    config = ConfigParser.ConfigParser()
    files = config.read(['.pcptwitter.conf', os.path.expanduser('~/.pcptwitter.conf')])
    if len(files) == 0:
        sys.stderr.write('No .pcptwitter.conf nor ~/.pcptwitter.conf found. Those files\n')
        sys.stderr.write('contain the OAUTH keys for this script to work.\n')
        sys.exit(1)

    keys = check_conffile(config)
    if not keys:
        print('Configuration file is missing one of the keys')
        sys.exit(1)

    api = twitter.Api(consumer_key=keys['consumer_key'],
                      consumer_secret=keys['consumer_secret'],
                      access_token_key=keys['access_token_key'],
                      access_token_secret=keys['access_token_secret'])

    statuses = api.GetUserTimeline(screen_name=USER)
    print('User statuses:')
    print([s.text for s in statuses])
    print()
    if len(sys.argv) <= 1:
        print('Specify a file whose length is <= 140 characters containing the text to be tweeted')
        sys.exit(0)

    f = open(sys.argv[1], "r")
    chars = f.read()
    f.close()
    if len(chars) > 140:
        sys.stderr.write('File %s is too long [%s]\n' % (sys.argv[1], len(chars)))
        sys.exit(1)

    # Tweet
    status = api.PostUpdate(chars)
    print('Tweeted: %s' % status.text)

if __name__ == '__main__':
    main()
