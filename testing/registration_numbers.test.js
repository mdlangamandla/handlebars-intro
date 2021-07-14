
var regList=[];
var testFilter = regNumFilter();
describe('Testing the Registration Number factory functions' , ()=>{
    it('Should convert an input string to an array' , ()=>{
        var str = 'ca 342 234'
        assert.deepEqual(testFilter.inputToList(str),['CA 342 234']);
        str = 'ca 324456,cy345123,cf139057'
        assert.deepEqual(testFilter.inputToList(str),['CA 324 456','CY 345 123','CF 139 057']);
        
    });
    it('Should add new registration numbers to the list' , ()=>{
        regList = ['CA 324 456','CY 345 123','CF 139 057']
        
        testFilter.addToList('CA 994 405');
        assert.deepEqual(regList,['CA 994 405','CA 324 456','CY 345 123','CF 139 057']);
    });
  
    it('should check if a registration is valid' , ()=>{
        assert.equal(testFilter.validityTest('CY 345 973'), true);
        assert.equal(testFilter.validityTest('ten-ten'), false);
        assert.equal(testFilter.validityTest('CX 345 973'), false);
    });

    it('Should check if a registration is not a duplicate' , ()=>{
        regList = ['CA 324 456','CJ 345 123','CK 139 057']
        assert.equal(testFilter.validityTest('CK 445 973'), true);
        assert.equal(testFilter.validityTest('CA 324 456'), false);
    });

    it('Should return a list of only the cars from a specific town.', ()=>{
        regList = ['CA 324 456','CJ 345 123','CK 139 057']
        assert.deepEqual(testFilter.carsForTown('Cape Town'),['CA 324 456']);
        assert.deepEqual(testFilter.carsForTown('Bellville'),['CY 345 123']);
        assert.deepEqual(testFilter.carsForTown('Kuilsriver'),['CF 139 057']);
        assert.deepEqual(testFilter.carsForTown('Stellenbosch'),[]);
    });

    it('Should add spaces to registration numbers that are valid but missing spaces' ,()=>{
        var str = 'CA345247'
        assert.equal(testFilter.spaceCheck(str),'CA 345 247');
        str = 'CY 32 5207'
      
        assert.equal(testFilter.spaceCheck(str),'CY 385 247');
        str = 'CAA 32 5207'
        assert.equal(testFilter.spaceCheck(str),'CAA 325 207');
        str = 'C AA 3 8 5 2 47'
        assert.equal(testFilter.spaceCheck(str),'CAA 385 247');
    });
});