import { apiSlice } from "./apiSlice";

const announcementUrl = `/api/bernales`;

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAnnouncement: builder.query({
      query: () => `${announcementUrl}`,
    }),
    getAnnouncement: builder.query({
      query: (id) => `${announcementUrl}/${id}`,
    }),
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${announcementUrl}/new-announcement`,
        method: "POST",
        body: data,
      }),
    }),
    updateAnnouncement: builder.mutation({
      query: ({ data, announcementId }) => ({
        url: `${announcementUrl}/${announcementId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAnnouncement: builder.mutation({
      query: (announcementId) => ({
        url: `${announcementUrl}/${announcementId}`,
        method: "DELETE",
      }),
    }),
    lastAnnouncement: builder.query({
      query: () => `${announcementUrl}/last`,
    }),
  }),
});

export const {
  useGetAllAnnouncementQuery,
  useGetAnnouncementQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useLastAnnouncementQuery,
} = announcementApiSlice;
