// import { ApiResponseInterface, TaskApiResponseInterface, TasksApiResponseInterface } from '@/interfaces';
// import { api } from '../api';

// export interface TaskBody {
//     description: string | null;
//     title: string;
// }

// interface UpdateTaskBody extends TaskBody {
//     completed?: boolean;
// }

// export interface UpdateTask {
//     body: UpdateTaskBody;
//     taskId: string;
// }

// export const taskApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getTasks: builder.query<TasksApiResponseInterface, string>({
//             query: (completedOption) => ({
//                 url: `/tasks?completed=${completedOption}`,
//             }),
//             providesTags: ['tasks'],
//         }),


//         getTaskById: builder.query<TaskApiResponseInterface, string>({
//             query: (taskId) => ({
//                 url: `/tasks/${taskId}`,
//             }),
//             providesTags: ['tasks'],
//         }),

//         createTask: builder.mutation<TaskApiResponseInterface, TaskBody>({
//             query: (body) => ({
//                 url: '/tasks',
//                 method: 'POST',
//                 body,
//             }),
//             invalidatesTags: ['tasks'],
//         }),

//         updateTask: builder.mutation<TaskApiResponseInterface, UpdateTask>({
//             query: ({ body, taskId }) => ({
//                 url: `/tasks/${taskId}`,
//                 method: 'PATCH',
//                 body,
//             }),
//             invalidatesTags: ['tasks'],
//         }),


//         deleteTask: builder.mutation<ApiResponseInterface, string>({
//             query: (taskId) => ({
//                 url: `/tasks/${taskId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['tasks'],
//         }),

//     }),
// });

// export const {
//     useGetTasksQuery,
//     useGetTaskByIdQuery,
//     useCreateTaskMutation,
//     useUpdateTaskMutation,
//     useDeleteTaskMutation,
// } = taskApi;
