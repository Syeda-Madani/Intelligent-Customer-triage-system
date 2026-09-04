import nltk
import contractions
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from nltk.corpus import wordnet


stop_words = set(stopwords.words('english'))
stop_words.discard('not')
stop_words.discard('no')

lemmatizer = WordNetLemmatizer()


def get_wordnet_pos(tag):
  if tag.startswith('J'):
    return wordnet.ADJ
  elif tag.startswith('V'):
    return wordnet.VERB
  elif tag.startswith('N'):
    return wordnet.NOUN
  elif tag.startswith('R'):
    return wordnet.ADV
  else:
    return wordnet.NOUN  


def preprocess_text(text):
   
   #Expand Contractions
   text = contractions.fix(text)


   #Convert to lowercase
   text  = text.lower()
   
   
   #Word Tokenization
   tokens = word_tokenize(text)
   
   
   #Remove punctuation
   tokens = [token for token in tokens if token not in string.punctuation]


   #Remove stopwords
   tokens = [token for token in tokens if token not in stop_words]

   #pos_tagging
   pos_tags = pos_tag(tokens)

   #Lemmatization
   tokens = [
       lemmatizer.lemmatize(token, get_wordnet_pos(tag))
       for token, tag in pos_tags
       ]

   return tokens