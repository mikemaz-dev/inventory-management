import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

import { IInventoriesWithItems } from '@/types/inventories-with-items.types'

type TExcelRow = Record<string, string | number | boolean | null>

export function exportAllInventories(
	inventories: IInventoriesWithItems[],
	fileName = 'inventories.xlsx'
) {
	if (!inventories.length) return

	const data: TExcelRow[] = []

	inventories.forEach(inv => {
		if (!inv.items?.length) {
			data.push({
				'Inventory Title': inv.title,
				'Inventory Description': inv.description || '',
				'Inventory Category': inv.category,
				'Inventory Owner': inv.owner?.email || ''
			})

			return
		}

		inv.items.forEach(item => {
			const row: TExcelRow = {
				'Inventory Title': inv.title,
				'Inventory Description': inv.description || '',
				'Inventory Category': inv.category,
				'Inventory Owner': inv.owner?.email || '',
				'Item Custom ID': item.customId,
				'Item Created By': item.createdBy?.email || '',
				'Item Created At': item.createdAt?.toString() || '',
				'Item Updated At': item.updatedAt?.toString() || ''
			}

			item.itemFieldValues?.forEach(fv => {
				if (fv.valueString) {
					row[fv.field.title] = fv.valueString
				} else if (fv.valueNumber !== null) {
					row[fv.field.title] = fv.valueNumber
				} else if (fv.valueBoolean !== null) {
					row[fv.field.title] = fv.valueBoolean
				}
			})

			data.push(row)
		})
	})

	const worksheet = XLSX.utils.json_to_sheet(data)
	const workbook = XLSX.utils.book_new()

	XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventories')

	const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

	const blob = new Blob([excelBuffer], {
		type: 'application/octet-stream'
	})

	saveAs(blob, fileName)
}
