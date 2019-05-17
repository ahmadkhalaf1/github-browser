import mcache from "memory-cache";
// cache service for get requests
const longMaxAge = 31536000;
export const cache = (duration: any) => {
  return (req: any, res: any, next: any) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body: any) => {
        mcache.put(key, body, duration * longMaxAge);
        res.sendResponse(body);
      };
      next();
    }
  };
};
