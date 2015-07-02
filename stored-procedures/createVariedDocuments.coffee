generateData = (memo) ->

  unless memo?.remaining?
    throw new Error('generateData must be called with an object containing a `remaining` field.')
  unless memo.totalCount?
    memo.totalCount = 0
  memo.countForThisRun = 0
  timeout = memo.timeout or 500
  startTime = new Date()
  memo.stillTime = true

  possibleValues =
    ProjectHierarchy: [
      [1, 2, 3],
      [1, 2, 4],
      [1, 2],
      [5],
      [5, 6]
    ],
    Priority: [1, 2, 3, 4]
    Severity: [1, 2, 3, 4]
    Points: [null, 0.5, 1, 2, 3, 5, 8, 13]
    State: ['Backlog', 'Ready', 'In Progress', 'In Testing', 'Accepted', 'Shipped']

  getIndex = (length) ->
    return Math.floor(Math.random() * length)

  getRandomValue = (possibleValues) ->
    index = getIndex(possibleValues.length)
    return possibleValues[index]

  keys = (key for key, value of possibleValues)

  collection = getContext().getCollection()
  collectionLink = collection.getSelfLink()

  memo.stillQueueing = true
  while memo.remaining > 0 and memo.stillQueueing and memo.stillTime
    row = {}
    for key in keys
      row[key] = getRandomValue(possibleValues[key])
    getContext().getResponse().setBody(memo)
    memo.stillQueueing = collection.createDocument(collectionLink, row)
    if memo.stillQueueing
      memo.remaining--
      memo.countForThisRun++
      memo.totalCount++
    nowTime = new Date()
    memo.nowTime = nowTime
    memo.startTime = startTime
    memo.stillTime = (nowTime - startTime) < timeout
    if memo.stillTime
      memo.continuation = null
    else
      memo.continuation = 'Value does not matter'

  getContext().getResponse().setBody(memo)
  return memo

exports.generateData = generateData
