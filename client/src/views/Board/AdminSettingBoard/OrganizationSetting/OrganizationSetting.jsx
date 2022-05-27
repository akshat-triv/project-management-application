import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getOrganizationMembers } from '../../../../redux/members/members.actions';
import { selectMembers } from '../../../../redux/members/members.selectors';
import { selectProjects } from '../../../../redux/projects/projects.selectors';
import { Margin } from '../../../../shared/utils/global';
import { Container, FlexContainer, Title } from './OrganizationSetting.style';
import MemberTable from './MemberTable/MemberTable';
import OrganizationTable from './OrganizationTable/OrganizationTable';
import Button from '../../../../shared/components/Button/Button';
import InviteUserModal from './MemberTable/InviteUserModal/InviteUserModal';

const OrganizationSetting = ({
  organization,
  getOrganizationMembers,
  memberList,
  projectList,
}) => {
  useEffect(() => {
    getOrganizationMembers(organization._id);
  }, []);

  const [inviteUserModalActive, setInviteUserModalActive] = useState(false);

  return (
    <Container>
      <Margin bottom={60}>
        <Margin bottom={20}>
          <Title>Your Organization</Title>
        </Margin>
        <OrganizationTable
          organization={organization}
          memberCount={memberList.length}
          projectCount={Object.keys(projectList).length}
        />
      </Margin>
      <FlexContainer>
        <Title>Organization Members</Title>
        <Button
          text="Invite user"
          variant="primary"
          onClick={() => {
            setInviteUserModalActive(true);
          }}
        />
      </FlexContainer>
      <MemberTable memberList={memberList} />
      {inviteUserModalActive && (
        <InviteUserModal
          closeModal={() => setInviteUserModalActive(false)}
          organizationId={organization._id}
        />
      )}
    </Container>
  );
};

OrganizationSetting.propTypes = {
  organization: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organization: (state) => state.organization,
  memberList: selectMembers,
  projectList: selectProjects,
});

export default connect(mapStateToProps, { getOrganizationMembers })(
  OrganizationSetting
);
