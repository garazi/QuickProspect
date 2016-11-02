@IsTest(SeeAllData=true)
public class TestQuickProspectApexController {
    
    static testMethod void testGetProspect() {        
        String firstname = 'John';
        String lastname = 'Doe';
        String phone = '123-456-7890';
        String email = 'j@doe.com';
        Id propertyID = 'a0341000002670mAAA';
        QuickProspectApexController.getProspect(firstname, lastname, phone, email, propertyID);
        
        firstname = 'Robert';
        lastname = 'Smith';
        phone = '123-456-7890';
        email = 'r@smith.com';
        propertyID = 'a0341000002670mAAA';
        QuickProspectApexController.getProspect(firstname, lastname, phone, email, propertyID);
    }   
}