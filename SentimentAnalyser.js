function SentimentAnalyser() {
  this.positiveWords = ['positive', 'success', 'grow', 'gains', 'happy', 'healthy']
  this.negativeWords = ['disappointing', 'concerns', 'decline', 'drag', 'slump', 'feared']
}

SentimentAnalyser.prototype.analyse = function(story) {
  var alphaNumericOnly = story.toLowerCase().replace(/[^\w\s]/gi, '')
  var words = alphaNumericOnly.split(" ")
  return this.finalResult(this.generateScore(words))
}

SentimentAnalyser.prototype.generateScore = function(words) {
  var positiveMatches = this.countMatches(words, this.positiveWords)
  var negativeMatches = this.countMatches(words, this.negativeWords)

  return positiveMatches.length - negativeMatches.length
}

SentimentAnalyser.prototype.countMatches = function(words, list) {
  return words.filter(function(word) {
    return list.includes(word)
  })
}

SentimentAnalyser.prototype.finalResult = function(score) {
  if(score >= 2) {
    return'positive'
  } else if (score >= 0 && score < 2) {
    return 'neutral'
  } else if (score < 0) {
    return 'negative'
  }
}

module.exports = SentimentAnalyser;
