package com.projeto.starter.components;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.projeto.starter.models.Report;
import com.projeto.starter.models.Sale;
import com.projeto.starter.services.ReportService;
import com.projeto.starter.services.SaleService;

@Component
public class Reports {
	
	private static final Logger log = LoggerFactory.getLogger(Reports.class);
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private SaleService saleService;
	
	/*
	 * É necessário colocar a anotação @EnableScheduling em ProjetoApplication
	 * para habilitar o scheduling
	 * */
	@Scheduled(cron = "0 */1 * * * *") // executa o método a cada 1 min
	//@Scheduled(fixedRate = 5000)
	public void updateReport() {
		//log.info("Test time ", dateFormat.format(new Date()));
		
		List<Sale> sales;
		
		try {
			sales = saleService.getAllSalesDesc();
			//log.info(Arrays.toString(sales.toArray()));
			log.info("Updating reports");
			try {
				for(Sale sale: sales) {
					//log.info(sale.getId()+ "," +sale.getDateTimeSale()+","+ sale.getPaymentMethod());
					reportService.addReport(
						new Report(sale.getId(), LocalDateTime.parse(sale.getDateTimeSale()+"T00:00:00"), sale.getPaymentMethod())
					);
				}
			} catch(Exception e) {
				log.info(e.getMessage());
			}
			
		} catch(Exception e) {
			log.info(e.getMessage());
		}
	}
}
