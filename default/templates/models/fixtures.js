// Main file that loads all model fixtures
import fixture from 'can-fixture';
<%  
var jwtToken;
if(idProp === '_id') {
  jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1MzcwNzEyMDAsIl9pZCI6MX0.6SbVcUHJjbbzJ0Kt6x3iOSnTUms7EqO0MGkMp8m6OTg'; 
} else {
  jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1MzcwNzEyMDAsImlkIjoxfQ.983GpHmk06PBcKGKUwZzeKTJw1xAdrHQHVsDiqKZo4A';
}
%>
// Fixtures for token login when the idProp is `_id`.
fixture('OPTIONS <%= feathersUrl %>/authentication', function(request, response){
  return response(200, '', `HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
    Access-Control-Allow-Headers: content-type
    Connection: keep-alive`
  );
});
fixture('POST <%= feathersUrl %>/authentication', function(request, response){
  return response({
    accessToken: '<%= jwtToken %>'
  });
});
