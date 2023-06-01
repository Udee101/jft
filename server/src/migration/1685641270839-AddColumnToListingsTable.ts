import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnToListingsTable1685641270839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'listings',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('listings', 'updated_at')
    }

}
