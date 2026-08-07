// src/utils/canModify.ts
export const canModify = (
  currentUser: { id: string; role: string } | null,
  ownerId: string,
) => {
  if (!currentUser) return false;
  return currentUser.role === "ADMIN" || currentUser.id === ownerId;
};
