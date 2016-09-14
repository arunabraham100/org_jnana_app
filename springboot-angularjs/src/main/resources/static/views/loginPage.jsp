
  <form  name="loginForm" role="form" class="row" novalidate="novalidate">
   <div class="col-md-6">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" name="email" class="form-control" id="email" ng-model="email"  placeholder="Enter email" required="required">
     <span class="label label-danger" data-ng-show="submitted && loginForm.email.$error.required">Required Field!</span>
      <span class="label label-danger" data-ng-show="submitted && loginForm.$error.email">Invalid email format!</span>
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" name="password" class="form-control" id="pwd" ng-model="password" ng-pattern="/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/" placeholder="Enter password" required="required">
       <span class="label label-danger" data-ng-show="submitted && loginForm.password.$error.required">Required Field !</span>
   		<span class="label label-danger" data-ng-show="submitted && loginForm.password.$error.pattern">Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol)</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox">Remember me</label>
    </div>
    <br>
     <br>
     <button type="submit" class="btn btn-default"  ng-click="validate()">Submit</button>
     </div>
    </form>
  <br>
  <h3>New User</h3>
<a href="#/register" class="btn btn-info" role="button" >Register</a>
