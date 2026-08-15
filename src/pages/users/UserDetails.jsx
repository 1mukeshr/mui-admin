import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { ErrorState } from '../../components/common/ErrorState';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatDateTime, roleLabel } from '../../utils/format';

export function UserDetails() {
  const { id } = useParams();
  const { users, hasPermission } = useAuth();
  const user = users.find((item) => item.id === id);
  const navigate = useNavigate();

  if (!user) {
    return <ErrorState title="User not found" description="This account may have been removed." onRetry={() => navigate('/users')} />;
  }

  const fields = [
    ['Email', user.email],
    ['Role', roleLabel(user.role)],
    ['Department', user.department || '—'],
    ['Phone', user.phone || '—'],
    ['Created', formatDate(user.createdAt)],
    ['Last login', user.lastLogin ? formatDateTime(user.lastLogin) : 'Never'],
  ];

  return (
    <>
      <PageHeader
        title="User details"
        crumbs={[
          { label: 'Users', to: '/users' },
          { label: user.name },
        ]}
        actions={
          hasPermission('users.edit') ? (
            <Button variant="contained" onClick={() => navigate(`/users/${user.id}/edit`)}>
              Edit user
            </Button>
          ) : undefined
        }
      />
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5, minWidth: 0 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', flexShrink: 0 }}>{user.name.charAt(0)}</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" noWrap>
                {user.name}
              </Typography>
              <StatusChip value={user.status} />
            </Box>
          </Stack>
          <Grid container spacing={2}>
            {fields.map(([label, value]) => (
              <Grid item xs={12} sm={6} md={4} key={label}>
                <Typography variant="caption" color="text.secondary">
                  {label}
                </Typography>
                <Typography>{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
