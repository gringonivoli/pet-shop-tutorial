const { expect } = require('chai');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Adoption = contract.fromArtifact('Adoption');


describe('Adoption', function() {
    const [owner, other] = accounts;
    const aPetId = 5;
    let adoption;

    before(async () => {
        adoption = await Adoption.new({from: owner});
    });

    describe('adopting a pet and retriving account address', async () => {
        before('adopt a pet using other account', async () => {
            await adoption.adopt(aPetId, {from: other});
        });

        it('can fetch the address of an owner by pet id', async () => {
            const adopter = await adoption.adopters(aPetId);
            
            expect(adopter).to.be.equal(other);
        });

        it('can fetch the collection of all pet owners addresses', async () => {
            const adopters = await adoption.getAdopters();

            expect(adopters[aPetId]).to.be.equal(other);
        });
    });
})

