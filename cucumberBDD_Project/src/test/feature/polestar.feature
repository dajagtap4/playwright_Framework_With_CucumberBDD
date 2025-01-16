Feature: Polestar UI Web Testing Functionality

  Scenario: TC:001 - Verify user can modify design and order for Polish2/polestar2
    Given User navigates to the polestar Homepage
    * User should handle popup window by selecting accep all
    * User should select polestar2 option from top navigation bar
    * User should select design and order option
    * User should select Long_range_Dual option
    * User Should select Exteriör
    * User Should select Interiör
    * User Should select Fälgar
    * Select submit button


  Scenario: TC:002 - Verify user can Book a test drive
    Given User navigates to the polestar Homepage
    * User should handle popup window by selecting accep all
    * User should click on discover button
    * User should click on book test drive button
    * User should click on subscribe button
    * User should eneter firstname in form 
    * User should eneter lastname in form 
    * User should eneter email in form 
    * User should eneter pincode in form 
    * User should select car option from dropDownCarsYouAreInterestedIn
    * User should select checkbox
    * User should select submit form



  Scenario: TC:003 -  navigate to instagram page and verify title
    Given User navigates to the polestar Homepage
    * User should handle popup window by selecting accep all
    * User click on instagram link
    * User assert homepage title.

