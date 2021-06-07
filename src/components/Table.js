import React, {useCallback, useState} from 'react';
import {Card, DataTable, Page} from '@shopify/polaris';

export default function TableCustom(props) {
  const {listData, listHeadings, listSort} = props;
   

  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = listData
  const rows = sortedRows ? sortedRows : initiallySortedRows;

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
    [rows],
  );

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          columnContentTypes={[
          ]}
          headings={listHeadings}
          rows={rows}
          sortable={listSort}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={handleSort}
        />
      </Card>
    </Page>
  );

  function sortCurrency(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index]);
      const amountB = parseFloat(rowB[index]);

      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  }
}
