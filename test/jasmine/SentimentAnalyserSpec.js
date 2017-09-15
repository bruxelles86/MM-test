const SentimentAnalyser = require('../../SentimentAnalyser.js')

describe('SentimentAnalyser', () => {
  var sentimentAnalyser

  beforeEach(() => {
    sentimentAnalyser = new SentimentAnalyser()
  });

  it('returns sentiment as neutral for story 1', () => {
    var story1 = "Google has some concerns to address the balance of this year, and beyond. Over the long run, the consensus analyst recommendation for Google as a 'strong buy' is warranted as the company continues driving a healthy double-digit top line growth. But that doesn't mean there won't be a hurdle, or three, to overcome along the way."
    result = sentimentAnalyser.analyse(story1)
    expect(result).toEqual('neutral')
  });

  it('returns sentiment as negative for story 2', () => {
    var story2 = "Investors were encouraged by a healthy gain in the number of people looking at Google's ads, even as the average prices for those marketing messages extended a three-and-half year slump. The market also had been bracing for more disappointing numbers, triggering a 'relief rally' when the results weren't as bad as feared, BGC Partners analyst Colin Gillis said."
    result = sentimentAnalyser.analyse(story2)
    expect(result).toEqual('negative')
  })
});
