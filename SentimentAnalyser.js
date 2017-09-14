function SentimentAnalyser() {
  this.positiveWords = ['positive', 'success', 'grow', 'gains', 'happy', 'healthy']
  this.negativeWords = ['disappointing', 'concerns', 'decline', 'drag', 'slump', 'feared']
}

SentimentAnalyser.prototype.analyse = function(story) {
  var alphaNumericOnly = story.toLowerCase().replace(/[^\w\s]/gi, '')
  var words = alphaNumericOnly.split(" ")
  return this._finalResult(this._generateScore(words))
}

SentimentAnalyser.prototype._generateScore = function(words) {
  var positiveMatches = this._countMatches(words, this.positiveWords)
  var negativeMatches = this._countMatches(words, this.negativeWords)

  return positiveMatches.length - negativeMatches.length
}

SentimentAnalyser.prototype._countMatches = function(words, list) {
  return words.filter(word => {
    return list.includes(word)
  })
}

SentimentAnalyser.prototype._finalResult = function(score) {
  if(score >= 2) {
    return'positive'
  } else if (score >= 0 && score < 2) {
    return 'neutral'
  } else if (score < 0) {
    return 'negative'
  }
}

module.exports = SentimentAnalyser;
