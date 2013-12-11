# RequestData

To retrieve the foo request variable:

```javascript
RequestData.get('foo') // --> 'bar'
RequestData.post('foo') // --> 'bar'
```

Both methods will throw a Meteor.Error if the key isn't found so make sure you use wrap with a try/catch if the variable is optional.

**NOTE**: POST data is not available to the client at the moment
