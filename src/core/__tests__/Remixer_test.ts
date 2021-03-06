import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { DataType } from '../../lib/Constants';
import { remixer } from '../Remixer';

const expect = chai.expect;
chai.use(sinonChai);

describe('Remixer', () => {

  beforeEach(() => {
    localStorage.clear();
    remixer.addBooleanVariable('key1', true);
    remixer.addStringVariable('key2', 'testString');
    remixer.addNumberVariable('key3', 40);
    remixer.addColorVariable('key4', '#4285F4', ['#4285F4', '#0F9D58']);
    remixer.addRangeVariable('key5', 24, 20, 40, 2);
  });

  it('should create an iframe after start', () => {
    expect(remixer.frameElement).to.not.exist;
    remixer.start();
    expect(remixer.frameElement).to.exist;
  });

  it('have the correct number of variables in array', () => {
    const variablesArray = remixer.attachedInstance.variablesArray;
    expect(variablesArray).to.have.length(5);
  });

  it('should retrieve variables from map', () => {
    const variablesMap = remixer.attachedInstance.variables;
    expect(variablesMap).to.have.all.keys('key1', 'key2', 'key3', 'key4', 'key5');
  });

  it('should retrieve correct variable from map by key', () => {
    const stringVariable = remixer.getVariable('key2');
    expect(stringVariable.dataType).to.equal(DataType.STRING);
  });

  it('should update selected value of variable', () => {
    const numberVariable = remixer.getVariable('key3');
    expect(numberVariable.selectedValue).to.equal(40);

    remixer.updateVariable(numberVariable, 50);
    expect(numberVariable.selectedValue).to.equal(50);
  });

  it('should clone and update selected value of variable', () => {
    const rangeVariable = remixer.getVariable('key5');
    const clone = remixer.cloneAndUpdateVariable(rangeVariable, 30);

    expect(rangeVariable.dataType).to.equal(DataType.NUMBER);
    expect(rangeVariable.selectedValue).to.equal(24);
    expect(clone.dataType).to.equal(DataType.NUMBER);
    expect(clone.selectedValue).to.equal(30);
  });
});
