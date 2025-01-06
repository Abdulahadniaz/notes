/*
 ================Indexing================
 
 Indexing is way to get an unordered table of the database to an ordered table.
 and that helps in faster retrieval of data.
 
 If the tables is not indexed, you will need to search all the rows linearly.
 And that is going to be a problem when we have thousads to millions of rows.
 
 Lets make an example:
 
 Index_test table:
 Company_ID              UNIT              UNIT_COST
 10                      14                  10
 18                      1                   10
 21                      140                 10
 12                      160                 10
 18                      14                  10
 .
 .
 .
 .
 
 */
SELECT
    company_id,
    units,
    unit_cost
FROM
    index_test
WHERE
    company_id = 18
    /*
     
     The database would have to search through all rows in the order they appear in the table,
     one at a time.So to search for all of the potential instances of the company_id number 18,
     the database must look through the entire table for all appearances of 18 in the company_id column.
     
     Now imagine if we have billions of rows.
     Would that be efficient?
     
     
     Solution is Indexing:
     
     What indexing actually does is it sets up the column on which your search conditions are based
     and make them in an ordered way.
     
     With an index on company_id, our table would look like this:
     
     Company_ID              UNIT              UNIT_COST
     .
     .
     .
     18                      1                   10
     18                      14                  10
     .
     .
     .
     
     Now,
     the database can search for company_id number 18
     and return all the requested columns for that row then move on to the next row.
     If the next row is also company_id number 18 then it will return this row as well
     If the next row's company_id is 20,
     the query knows to stop searching
     and the query will finish.
     
     Voila! We dont need to loop biilions of rows that appear after company_id 18.
     */
    /*
     How indexing works?
     
     Indexing doesnt mean we have to create an ordered table everytime the condition is changed.
     What actually happens is that the db creates a data structure on the column that is indexed.
     The data structure is a B-Tree having nodes that have m number of children nodes
     This data strcutre is easier for storing and really efficient.
     
     When a column is indexed, there is no other column stored on the data structure.
     Only indexed columnn and a pointer to the row is stored.
     
     A pointer is a reference to the row in the table.
     
     After indexing, we can visualize the table as:
     
     Company_ID              Pointer    
     10                      _1245
     10                      _2345
     12                      _3456
     12                      _4567
     18                      _5678
     18                      _6789
     .
     .
     */
    -- Create a basic index on Company_ID
    CREATE INDEX idx_company_id ON index_test (company_id);

-- Alternatively, if you want to ensure unique company IDs (if that's a business requirement):
-- CREATE UNIQUE INDEX idx_company_id ON index_test (company_id);
-- To drop an index:
DROP INDEX idx_company_id;

-- You can also create a composite index if you frequently search by both company_id and unit
CREATE INDEX idx_company_unit ON index_test (company_id, units);

/*
 Advantages of Indexing:
 
 1 - Fast retrieval of data
 2 - Reduces the amount of time needed to execute queries
 
 Disadvantages of Indexing:
 
 1 - Indexing takes up space
 2 - Indexing slows down the insertion, update, and delete operations
 
 */
/*
 WITHOUT INDEX:
 When inserting:
 Company_ID   UNIT    UNIT_COST
 10          14       10
 18          1        10
 21          140      10
 Add a new row:
 15          50       20        (Just append to the end)
 
 WITH INDEX on Company_ID:
 1. Table Insert: 
 Company_ID   UNIT    UNIT_COST
 10          14       10
 18          1        10
 21          140      10
 Add a new row:
 15          50       20        (Just append to the end)
 
 2. Index Update: Company_ID   Pointer
 10           _1234
 15           _8901    (Step 2: Insert into correct position )
 18           _2345
 21           _3456
 
 Similarly for UPDATE: */
/*
 For INSERT : Database must
 add the row to the main table Then
 add entry to the index B - tree in the correct sorted position If there are multiple indexes,
 this must be done for each index
 
 */