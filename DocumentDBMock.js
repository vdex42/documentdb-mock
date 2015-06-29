// Generated by CoffeeScript 1.9.2
(function() {
  var DocumentDBMock,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DocumentDBMock = (function() {
    function DocumentDBMock(storedProcedure) {
      this.storedProcedure = storedProcedure;
      this.getContext = bind(this.getContext, this);
      if (this.storedProcedure) {
        this.storedProcedure.__set__('getContext', this.getContext);
      }
      this.lastBody = null;
      this.lastOptions = null;
      this.lastEntityLink = null;
      this.lastQueryFilter = null;
      this.lastRow = null;
      this.rows = [];
      this.nextError = null;
      this.nextResources = [];
      this.nextOptions = {};
      this.nextCollectionOperationQueued = true;
      this.errorList = null;
      this.resourcesList = null;
      this.optionsList = null;
      this.collectionOperationQueuedList = null;
    }

    DocumentDBMock.prototype._shiftNext = function() {
      if ((this.errorList != null) && this.errorList.length > 0) {
        this.nextError = this.errorList.shift();
      }
      if ((this.resourcesList != null) && this.resourcesList.length > 0) {
        this.nextResources = this.resourcesList.shift();
      }
      if ((this.optionsList != null) && this.optionsList.length > 0) {
        return this.nextOptions = this.optionsList.shift();
      }
    };

    DocumentDBMock.prototype._shiftNextCollectionOperationQueued = function() {
      if ((this.collectionOperationQueuedList != null) && this.collectionOperationQueuedList.length > 0) {
        return this.nextCollectionOperationQueued = this.collectionOperationQueuedList.shift();
      }
    };

    DocumentDBMock.prototype.getContext = function() {
      return {
        getResponse: (function(_this) {
          return function() {
            return {
              setBody: function(body) {
                return _this.lastBody = body;
              }
            };
          };
        })(this),
        getCollection: (function(_this) {
          return function() {
            return {
              queryDocuments: function(lastEntityLink, lastQueryFilter, lastOptions, callback) {
                _this.lastEntityLink = lastEntityLink;
                _this.lastQueryFilter = lastQueryFilter;
                _this.lastOptions = lastOptions;
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this._shiftNext();
                  callback(_this.nextError, _this.nextResources, _this.nextOptions);
                }
                return _this.nextCollectionOperationQueued;
              },
              readDocuments: function(lastEntityLink, lastOptions, callback) {
                _this.lastEntityLink = lastEntityLink;
                _this.lastOptions = lastOptions;
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this._shiftNext();
                  callback(_this.nextError, _this.nextResources, _this.nextOptions);
                }
                return _this.nextCollectionOperationQueued;
              },
              getSelfLink: function() {
                return 'mocked-self-link';
              },
              createDocument: function(lastEntityLink, lastRow, lastOptions, callback) {
                _this.lastEntityLink = lastEntityLink;
                _this.lastRow = lastRow;
                _this.lastOptions = lastOptions;
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this.rows.push(_this.lastRow);
                  if (callback != null) {
                    _this._shiftNext();
                    callback(_this.nextError, _this.nextResources, _this.nextOptions);
                  }
                }
                return _this.nextCollectionOperationQueued;
              },
              readDocument: function(lastEntityLink, lastOptions, callback) {
                _this.lastEntityLink = lastEntityLink;
                _this.lastOptions = lastOptions;
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this._shiftNext();
                  callback(_this.nextError, _this.nextResources, _this.nextOptions);
                }
                return _this.nextCollectionOperationQueued;
              },
              replaceDocument: function(lastEntityLink, lastRow, lastOptions, callback) {
                var ref;
                _this.lastEntityLink = lastEntityLink;
                _this.lastRow = lastRow;
                _this.lastOptions = lastOptions;
                if (((ref = _this.lastRow) != null ? ref.id : void 0) == null) {
                  throw new Error("The input content is invalid because the required property, id, is missing.");
                }
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this.rows.push(_this.lastRow);
                  if (callback != null) {
                    _this._shiftNext();
                    callback(_this.nextError, _this.nextResources, _this.nextOptions);
                  }
                }
                return _this.nextCollectionOperationQueued;
              },
              deleteDocument: function(lastEntityLink, lastOptions, callback) {
                _this.lastEntityLink = lastEntityLink;
                _this.lastOptions = lastOptions;
                _this._shiftNextCollectionOperationQueued();
                if (_this.nextCollectionOperationQueued) {
                  _this.rows.push(_this.lastEntityLink);
                  if (callback != null) {
                    _this._shiftNext();
                    callback(_this.nextError, _this.nextResources, _this.nextOptions);
                  }
                }
                return _this.nextCollectionOperationQueued;
              }
            };
          };
        })(this)
      };
    };

    return DocumentDBMock;

  })();

  module.exports = DocumentDBMock;

}).call(this);

//# sourceMappingURL=DocumentDBMock.js.map
