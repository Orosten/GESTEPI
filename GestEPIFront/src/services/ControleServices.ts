

// async getControlAlertes() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const rows = await conn.query(`
//         SELECT 
//           e.id as epiId,
//           e.identifiantPersonnalise as identifiant,
//           e.type,
//           e.marque,
//           e.modele,
//           COALESCE(
//             DATE_ADD(MAX(c.date), INTERVAL e.periodiciteControle DAY),
//             DATE_ADD(e.dateMiseEnService, INTERVAL e.periodiciteControle DAY)
//           ) as dateProchainControl,
//           DATEDIFF(
//             COALESCE(
//               DATE_ADD(MAX(c.date), INTERVAL e.periodiciteControle DAY),
//               DATE_ADD(e.dateMiseEnService, INTERVAL e.periodiciteControle DAY)
//             ),
//             CURRENT_DATE()
//           ) as joursRestants
//         FROM 
//           epis e
//         LEFT JOIN 
//           controles c ON e.id = c.epiId
//         WHERE
//           NOT EXISTS (
//             SELECT 1 FROM controles c2 
//             WHERE c2.epiId = e.id 
//             AND c2.statut = 'MIS_AU_REBUT'
//             ORDER BY c2.date DESC 
//             LIMIT 1
//           )
//         GROUP BY 
//           e.id, e.identifiantPersonnalise, e.type, e.marque, e.modele
//         HAVING 
//           joursRestants <= 45
//         ORDER BY 
//           joursRestants ASC
//       `);
//       return rows;
//     } catch (error) {
//       throw error;
//     } finally {
//       if (conn) conn.release();
//     }
//   }