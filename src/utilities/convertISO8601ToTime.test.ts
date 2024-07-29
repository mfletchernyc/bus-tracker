import time from './convertISO8601ToTime'

describe('convertISO8601ToTime', () => {
  it('converts ISO-8601 date to a readable time', () => {
    expect(time('2024-02-24T17:43:21.682-05:00')).toBe('5:43:21')
  })
  it('returns an empty string for invalid dates', () => {
    expect(time('not a valid time')).toBe('')
  })
})
