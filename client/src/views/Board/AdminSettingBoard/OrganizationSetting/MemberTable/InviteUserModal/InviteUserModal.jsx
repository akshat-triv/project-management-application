import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { roleNames } from '../../../../../../shared/constants/roles';
import Modal from '../../../../../../shared/components/Modal/Modal';
import Button from '../../../../../../shared/components/Button/Button';
import DropDownMemu from '../../../../../../shared/components/DropDownMenu/DropDownMenu';
import Input from '../../../../../../shared/components/Form/Input/Input';
import api from '../../../../../../shared/utils/api';
import store from '../../../../../../redux/store';
import { setAlert } from '../../../../../../redux/alert/alert.actions';

const InviteUserModal = ({ closeModal, organizationId }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    position: '',
    password: 'invite',
    organizationId,
    role: null,
  });

  const { name, email, role, position } = formValues;

  const handleSubmit = async () => {
    try {
      console.log(formValues);
      const res = await api.post('/users/add-new-user', formValues);
      store.dispatch(setAlert(res.data.message, 'success'));
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      store.dispatch(setAlert('Sorry something went wrong!', 'error'));
    }
    closeModal();
  };

  function onChange(event) {
    if (event.target) {
      const { value, name } = event.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      const { value } = event;
      setFormValues({ ...formValues, ['role']: value });
    }
  }

  return (
    <Modal
      title="Invite user"
      modalWidth={700}
      renderOptions={() => renderOptions(handleSubmit, closeModal)}
    >
      <Input
        label="Name"
        type="text"
        name="name"
        width={350}
        height={36}
        maxLength={50}
        value={name}
        onChange={onChange}
        required
      />
      <Input
        label="Email"
        type="text"
        name="email"
        width={350}
        height={36}
        maxLength={50}
        value={email}
        onChange={onChange}
        required
      />
      <Input
        label="Position"
        type="text"
        name="position"
        width={350}
        height={36}
        maxLength={50}
        value={position}
        onChange={onChange}
        required
      />
      <DropDownMemu
        title="Choose role of this member"
        currentItem={() => role}
        onChange={onChange}
        options={getOptions(role)}
        renderValue={({ value: roleName }) => roleName}
      />
    </Modal>
  );
};

const renderOptions = (handleSubmit, closeModal) => (
  <Fragment>
    <Button
      text="Save"
      variant="primary"
      type="submit"
      onClick={handleSubmit}
    />
    <Button
      text="Cancel"
      variant="secondary"
      onClick={closeModal}
      type="button"
    />
  </Fragment>
);

const getOptions = (currentItem) =>
  Object.values(roleNames)
    .filter((roleName) => roleName !== currentItem)
    .map((roleName) => ({
      key: roleName,
      value: roleName,
    }));

InviteUserModal.propTypes = {
  children: PropTypes.element,
  organizationId: PropTypes.string,
};

export default InviteUserModal;
