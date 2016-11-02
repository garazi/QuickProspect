({
    doInit: function(component, event, helper) {
    	var foo = component.get("v.sObjectName");
    	console.log('quick foo: ', foo);
    	var property_id = component.get("v.recordId");
    	console.log('bar: ', property_id)
        // // Prepare a new record from template
        // component.find("ProspectRecordCreator").getNewRecord(
        //     "Prospect__c", // sObject type (entity API name)
        //     null, // record type
        //     null, // default record values
        //     false, // skip cache?
        //     $A.getCallback(function() {
        //         var rec = component.get("v.newProspect");
        //         var error = component.get("v.newProspectError");
        //         if (error || (rec === null)) {
        //             console.log("Error initializing record template: " + error);
        //         } else {
        //             console.log("Record template initialized: " + rec.sobjectType);
        //         }
        //     })
        // );
    },

    handleSaveProspect: function(component, event, helper) {
        var fname = component.find("firstname").get("v.value");
        var lname = component.find("lastname").get("v.value");
        var email = component.find("email").get("v.value");
        var phone = component.find("phone").get("v.value");
        var property_id = component.get("v.recordId");

        var action = component.get("c.getProspect");

        action.setParams({
            "firstname": fname,
            "lastname": lname,
            "phone": phone,
            "email": email,
            "propertyID": property_id
        });

        action.setCallback(this, function(response) {
            var res = response.getReturnValue();
            console.log("foo: ", res);
            var resultsToast = $A.get("e.force:showToast");
            if (res) {
                // Success! Prepare a toast UI message              
                resultsToast.setParams({
                    "title": "Prospect Saved",
                    "message": "The new prospect was created."
                });
            } else {
                resultsToast.setParams({
                    "title": "Duplicate Entry",
                    "message": "The prospect is already interested in this property."
                });
            }
            resultsToast.fire();
            $A.get("e.force:refreshView").fire();
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
        });
        $A.enqueueAction(action);
    }
})