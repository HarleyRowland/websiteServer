import duolingo
import simplejson as json

lingo  = duolingo.Duolingo('harleyrowland')
print json.dumps(lingo.get_user_info())
