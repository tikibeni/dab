# Performance test results

Brief description of the used server (choose one): HTTP/1.1

Brief description of your computer: Lenovo ThinkPad X1 Extreme 2nd gen (Ubuntu 22.04.3 LTS)

## No Redis Cache

### Retrieving todos

http_reqs: 49586  4957.921535/s
http_req_duration - median: 1.79ms
http_req_duration - 99th percentile: 3.18ms

## Redis Cache

### Retrieving todos

http_reqs: 59824  5981.750354/s
http_req_duration - median: 1.57ms 
http_req_duration - 99th percentile: 2.8ms

## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw:
As stated in the material we can simply see that caching enables much quicker access to the
resources, when we don't need to use the database engine to fetch them (excluding the first
query). Then explicitly when we don't cache the results, we have to query the data through
the db-engine every time we make a call.
