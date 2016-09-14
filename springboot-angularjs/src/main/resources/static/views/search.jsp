<div class="row">
        <div class="col-md-12">
        <!-- <hr color="gray" style="height:1px;"> -->
        <br><br>
            <div id="custom-search-input">
                <div class="input-group col-md-12" ng-keypress="resultKeyValidate($event)">
                    <input type="text" class="form-control input-lg" ng-model="searchtag" placeholder="Search" />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button" ng-click="resultValidate()">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                    
                </div>
            </div>
        </div>
	</div>