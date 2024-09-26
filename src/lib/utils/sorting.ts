export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export function createSortHandler(sortState: SortState, callback: () => void) {
  return (column: string) => {
    if (sortState.column === column) {
      sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.column = column;
      sortState.direction = 'asc';
    }
    callback();
  };
}
