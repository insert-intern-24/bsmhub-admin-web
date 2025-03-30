import { useCompanies } from '../context/users-context'
import { CompaniesActionDialog } from './users-action-dialog'
import { CompaniesDeleteDialog } from './users-delete-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanies()
  return (
    <>
      <CompaniesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      {currentRow && (
        <>
          <CompaniesActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CompaniesDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
