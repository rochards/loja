package com.projeto.starter.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.Report;
import com.projeto.starter.repositories.ReportRepository;

@Service
public class ReportService {

	@Autowired
	private ReportRepository reportRepository;
	
	public List<Report> getAllReports() {
		
		List<Report> reports = reportRepository.findAll();
		
		if (reports.isEmpty()) 
			throw new NoSuchElementException("No elements");
		
		return reports;
	}
	
	/*public Report getLastReport() throws NoSuchElementException {
		
		Report report = reportRepository.findLastReport();
		
		if (report == null)
			throw new NoSuchElementException();
		
		return report;
	}*/
	
	public List<Object> getByReportByDate() {
		
		List<Object> object = reportRepository.findByDate();
		
		if (object.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return object;
	}
	
	public Report addReport(@Valid Report report) {
		return reportRepository.save(report);
	}
}
