import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditTurnForm from './EditTurnForm';
import { editTurn } from '../../../store/actions/turns';
import { PageLayout } from '../../common';

const EditTurnPage = ({ match, history }) => {
  const turn = useSelector((state) => {
    return state.turns.find((turn) => turn.no === match.params.id);
  });
  const dispatch = useDispatch();
  return (
    <PageLayout>
      <h1>Tour n° {turn.no}</h1>
      <EditTurnForm
        turn={turn}
        onSubmit={(turn) => {
          dispatch(editTurn(turn, turn.id));
          history.push('/turns');
        }}
      />
    </PageLayout>
  );
};

export default EditTurnPage;