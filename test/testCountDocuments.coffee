###
1. Create a module to hold one or more stored procedures. You simply need to `exports` your function(s).
2. Create your mock with `mock = new DocumentDBMock('path/to/stored/procedure')`
3. Set `mock.nextResources`, `mock.nextError`, `mock.nextOptions`, and/or `mock.nextCollectionOperationQueued` to control
   the response that your stored procedure will see to the next collection operation. Note, nextCollectionOperationQueued
   is the Boolean that is immediately returned from collection operation calls. Setting this to `false` allows you to test
   situations where your stored procedure is defensively timed out by DocumentDB.
4. Call your stored procedure like it was a function from within your test with `mock.package.your-stored-procedure()`
5. Inspect `mock.lastBody` to see the output of your stored procedure. You can also inspect `mock.lastResponseOptions`
   'mock.lastCollectionLink`, and `mock.lastQueryFilter` to see the last values that your stored procedure sent into
   the most recent collection operation.
###

DocumentDBMock = require('../DocumentDBMock')  # You will just `require('documentdb-mock')`
mock = new DocumentDBMock('./stored-procedures/countDocuments')

exports.countTest =

  basicTest: (test) ->
    mock.nextResources = [
      {id: 1, value: 10}
      {id: 2, value: 20}
      {id: 3, value: 30}
    ]

    mock.package.count()

    test.equal(mock.lastBody.count, 3)
    test.ok(!mock.lastBody.continuation?)

    test.done()

  testContinuation: (test) ->
    firstBatch = [
      {id: 1, value: 10}
      {id: 2, value: 20}
    ]
    secondBatch = [
      {id: 3, value: 30}
      {id: 4, value: 40}
    ]
    mock.resourcesList = [firstBatch, secondBatch]

    firstOptions = {continuation: 'ABC123'}
    secondOptions = {}
    mock.optionsList = [firstOptions, secondOptions]

    mock.package.count()

    test.equal(mock.lastBody.count, 4)
    test.ok(!mock.lastBody.continuation?)

    # Note, lastResponseOptions is NOT the last options returned from a collection operation. This is the last one you sent in.
    test.equal(mock.lastOptions.continuation, 'ABC123')

    test.done()

  testTimeout: (test) ->
    firstBatch = [
      {id: 1, value: 10}
      {id: 2, value: 20}
    ]
    secondBatch = [
      {id: 3, value: 30}
      {id: 4, value: 40}
    ]
    mock.resourcesList = [firstBatch, secondBatch]

    firstOptions = {continuation: 'ABC123'}
    secondOptions = {}
    mock.optionsList = [firstOptions, secondOptions]

    mock.collectionOperationQueuedList = [true, false, true]

    mock.package.count()

    memo = mock.lastBody

    test.equal(memo.count, 2)
    test.equal(memo.continuation, 'ABC123')

    mock.package.count(memo)

    test.equal(memo.count, 4)

    test.done()
