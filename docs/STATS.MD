# Statistics
Navigate to WCA Statitics website and specifically the Database Query tool. 

In case the below do not work, it is possible the DB schema of the WCA stats tool has moved. In which case [the migration file](https://github.com/thewca/statistics/blob/6460e6cf257348d30792bf266c9281ee55d6c9f6/server/db/migration/V1__tables.sql) will come handy  

## Competitions in Ireland
```sql
SELECT COUNT(*) 
FROM competitions 
WHERE country_id ='Ireland' AND results_submitted_at IS NOT NULL
```

## Solves at Irish competitions
```sql
SELECT SUM(non_zero_count) FROM (
  SELECT
    (
      CASE WHEN value1 <> 0 THEN 1 ELSE 0 END +
      CASE WHEN value2 <> 0 THEN 1 ELSE 0 END +
      CASE WHEN value3 <> 0 THEN 1 ELSE 0 END +
      CASE WHEN value4 <> 0 THEN 1 ELSE 0 END +
      CASE WHEN value5 <> 0 THEN 1 ELSE 0 END
    ) AS non_zero_count
  FROM results r 
  JOIN competitions c
    ON r.competition_id = c.id
  WHERE c.country_id = 'Ireland'
) m;
```

## Number of participants
```sql
SELECT 
    COUNT(DISTINCT person_id)
FROM results r 
JOIN competitions c ON r.competition_id = c.id
WHERE c.country_id = 'Ireland'
```