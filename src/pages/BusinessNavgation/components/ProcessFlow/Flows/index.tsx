import React from 'react';
import FlowTypeOne from './typeOne';
import FlowTypeTwo from './typeTwo';
import FlowTypeThree from './typeThree';

interface Props {
  type: number;
}
const Flow: React.FC<Props> = props => {
  return (
    <div>
      {[1, 2, 3, 4].indexOf(props.type) > -1 && (
        <FlowTypeOne type={props.type} />
      )}
      {[5, 7, 8].indexOf(props.type) > -1 && <FlowTypeTwo type={props.type} />}
      {props.type == 6 && <FlowTypeThree type={props.type} />}
    </div>
  );
};
export default Flow;
