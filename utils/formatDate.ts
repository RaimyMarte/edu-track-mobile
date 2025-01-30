import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format('D [de] MMMM[,] YYYY [a las] h:mm A')