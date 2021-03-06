import * as chai from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import { remixer } from '../../core/Remixer';
import { Variable } from '../../core/variables/Variable';
import { CSS } from '../../lib/Constants';
import { DropdownControl } from '../controls/DropdownControl';

const expect = chai.expect;

describe('DropdownControl', () => {
  const key: string = 'test_variable';
  const initialValue: string = 'a';
  const limitedToValues: string[] = ['a', 'b', 'c'];
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addStringVariable(key, initialValue, limitedToValues);
    this.component = TestUtils.renderIntoDocument(
      <DropdownControl
        variable={variable}
        updateVariable={null}
      />,
    );
  });

  it('should render with proper class name', () => {
    const control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_DROPDOWN,
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it('have correct number of children with proper data values', () => {
    const list = TestUtils.findRenderedDOMComponentWithTag(
      this.component, 'ul',
    );

    expect(list.children.length).to.equal(3);

    for (let i = 0; i < list.children.length; i++) {
      const element = list.children[i] as HTMLElement;
      expect(element.dataset.value).to.equal(limitedToValues[i]);
    }
  });
});
